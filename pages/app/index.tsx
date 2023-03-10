import { useEffect, useState, useReducer } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { useAccount } from "wagmi";
import ProfileForm from "../../components/ProfileForm";
import { Profile } from "@prisma/client";
import * as React from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useProfileStore, useReferralStore } from "../../store";
import { ProfileFormSkeleton } from "../../components/skeletons";
import {
    getProfileByUserIdQuery,
    getProfileByHandleIdQuery,
} from "../../graphql/graphqlQueries";

import {
    createReferralQuery,
    createProfileQuery,
} from "../../graphql/graphqlMutations";
import { axiosAPIInstance } from "../../constants/axiosInstances";
import emails from "../../constants/email";
import { ClipLoader, GridLoader, RiseLoader } from "react-spinners";
import { BigClipLoader } from "../../components/Loader";

export default function AppPage() {
    const router = useRouter();

    const { address, isConnected } = useAccount();

    const { data: session } = useSession();

    const [referredFrom] = useReferralStore((state) => [state.referredFrom]);

    const user = session?.user ? session.user : { id: null, email: null };

    const [Profile, setProfile] = useState<Profile | null>(null);
    const [isQueryLoading, setIsQueryLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            const profile = await getProfileByUserIdQuery(
                (user.id as string) || "default"
            );
            setProfile(profile || null);
            setIsQueryLoading(false);
        };
        if (session) {
            getProfile();
        }
    }, [session, user.id]);

    const [queryInMintQueue, setQueryInMintQueue] = useState(false);
    const [isProfileCreating, setIsProfileCreating] = useState(false);

    const [isRouteLoading, setIsRouteLoading] = useState(false);

    const [setHandle] = useProfileStore((state: any) => [state.setHandle]);

    //Minted accounts should go to profile page
    useEffect(() => {
        if (!isQueryLoading && Profile)
            if (Profile.minted && isRouteLoading) {
                router.push(`/u/${Profile?.handle}`);
                setIsRouteLoading(true);
            } else setQueryInMintQueue(true);
    }, [Profile, isQueryLoading, isRouteLoading, router]);

    async function saveProfile(profile: Profile) {
        console.log({ id: user.id as string, profile });
        setIsProfileCreating(true);
        const data = await createProfileQuery(
            (user.id as string) || "default",
            profile
        )
            .then((data) => {
                if (data) {
                    setHandle(data.handle);
                    setQueryInMintQueue(true);
                }
                return data;
            })
            .catch((err) => {
                console.log(err);
                throw new Error("Profile creation failed");
            });

        if (!data) throw new Error("Profile creation failed");

        await axiosAPIInstance.post("/mail", {
            to: user.email,
            subject: emails.profileCreated.subject,
            html: emails.profileCreated.html,
        });

        if (referredFrom !== "" && referredFrom !== undefined) {
            const referrer = await getProfileByHandleIdQuery(referredFrom);
            if (referrer) {
                await createReferralQuery(
                    referrer.handle,
                    user.email || "default"
                );
            }
        }

        if (!isRouteLoading) {
            router.push("/u");
            setIsRouteLoading(true);
        }
    }

    async function handleSubmit(userProfile: Profile) {
        await saveProfile(userProfile);
        setIsProfileCreating(false);
    }

    if (!isConnected)
        return (
            <>
                <section className="py-8 w-full">
                    <div className="container">
                        <div className="w-full flex items-center justify-center min-h-[50vh] p-16 rounded-normal shadow-normal bg-white dark:bg-gray-700">
                            <div className="text-center">
                                <h1 className="font-bold mb-16 text-2xl lg:text-4xl text-red-500">
                                    Please connect your wallet <br /> to mint your profile
                                </h1>
                                <RiseLoader size={30} speedMultiplier={0.8} />
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );

    if (isQueryLoading || isProfileCreating)
        return <BigClipLoader color="tertiary" />;

    return (
        <section className="py-8">
            <div className="container">
                {!Profile ? (
                    <ProfileForm
                        address={address}
                        handleSubmit={handleSubmit}
                    />
                ) : queryInMintQueue ? (
                    <div className="flex-col items-center justify-center">
                        <div className="mx-auto my-10 flex w-full max-w-[1000px] flex-col items-center justify-center rounded-[25px] border border-slate-700 bg-white p-8 shadow-normal md:py-14 md:px-20">
                            <h1
                                className={
                                    " mb-4 text-center text-2xl font-bold"
                                }
                            >
                                You are in the mint queue! We let you know as
                                soon as your profile is minted!{" "}
                            </h1>

                            <button
                                onClick={async () => {
                                    if (!isRouteLoading) {
                                        setIsRouteLoading(true);
                                        await router.push("/explore");
                                    }
                                }}
                                className=" rounded-full bg-gradient-to-r from-[#6D27F9] to-[#9F09FB] py-2.5 px-6 font-bold text-white transition-all hover:from-[#391188] hover:to-[#391188] md:min-w-[150px]"
                            >
                                explore
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex-col items-center justify-center">
                        <div className="mx-auto my-10 w-full max-w-[1000px] rounded-[25px] border p-8  shadow-normal md:py-14 md:px-20 ">
                            <ProfileFormSkeleton />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
