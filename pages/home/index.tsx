import { useEffect, useState } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "ethers";
// import { axiosInstance } from "../api/axiosApi";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import {
    getProfileByUserIdQuery,
    getUserQuery,
} from "../../graphql/graphqlQueries";

export default function Home() {
    const router = useRouter();
    const { data: session } = useSession();

    // const {
    //     isLoading: isProfileListLoading,
    //     isError: profileListError,
    //     data: ProfileList,
    // } = useQuery({
    //     queryKey: ["profiles"],
    //     queryFn: () =>
    //         fetch("http://localhost:3030/profile").then((res) => res.json()),
    // });

    const {
        isLoading: isProfileQueryLoading,
        isError: isProfileQueryError,
        data: Profile,
    } = useQuery(["getProfile", session?.user.id], async () =>
        getProfileByUserIdQuery(session?.user.id || "default")
    );

    const { isLoading: isUserQueryLoading, data: User } = useQuery(
        ["getUser", session?.user.id],
        async () => getUserQuery(session?.user.id || "default")
    );

    const [inMintQueue, setInMintQueue] = useState(false);

    //TODO turn this into a middleware
    useEffect(() => {
        if (!isProfileQueryLoading && !isUserQueryLoading && User) {
            console.log({ User, Profile });
            if (User.is_admin) router.push("/admin");
            if (!Profile && !User.is_admin) {
                router.push("/app");
            } else setInMintQueue(true);
        }
    }, [
        Profile,
        User,
        inMintQueue,
        isProfileQueryError,
        isProfileQueryLoading,
        isUserQueryLoading,
        router,
    ]);

    // useEffect(() => {
    //     if (!session) router.push("/");
    // }, [session, router]);

    // if (isProfileListLoading) {
    //     return (
    //         <section className="w-full flex flex-wrap ">
    //             <div className="container h-full">
    //                 <div className="w-full mx-auto text-black	 bg-white shadow-normal  rounded-[25px] p-8 md:py-14 md:px-20">
    //                     <ProfileFormSkeleton />
    //                 </div>
    //             </div>
    //         </section>
    //     );
    // }
    let queuedProfileList = <></>;
    let mintedProfileList = <></>;

    // if (!isProfileListLoading && !profileListError) {
    //     mintedProfileList = ProfileList.profiles.map((profile: any) => {
    //         if (profile.minted)
    //             return (
    //                 <ProfilePreview profile={profile} key={profile.handle} />
    //             );
    //         else return;
    //     });
    //     queuedProfileList = ProfileList.profiles.map((profile: any) => {
    //         if (profile.minted) return;
    //         else
    //             return (
    //                 <ProfilePreview profile={profile} key={profile.handle} />
    //             );
    //     });
    // }

    return (
        <section className="w-full flex flex-wrap ">
            <div className="container h-full">
                <div className="w-full mx-auto text-black	 bg-white shadow-normal  rounded-[25px] p-8 md:py-14 md:px-20">
                    <h1 className={" font-bold text-4xl mb-4 text-center py-5"}>
                        Profiles In Queue
                    </h1>
                    <div className="grid grid-cols-3 grid-flow-row gap-4">
                        {queuedProfileList}
                    </div>
                </div>
                <div className="w-full mx-auto text-black	 bg-white shadow-normal  rounded-[25px] p-8 md:py-14 md:px-20">
                    <h1 className={" font-bold text-4xl mb-4 text-center py-5"}>
                        Minted Profiles
                    </h1>
                    <div className="grid grid-cols-3 grid-flow-row gap-4">
                        {mintedProfileList}
                    </div>
                </div>
            </div>
        </section>
    );
}
