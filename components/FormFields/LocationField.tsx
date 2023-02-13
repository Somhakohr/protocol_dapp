import { Profile } from "@prisma/client";
import { Combobox } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchComboBox from "./SearchComboBox";
import { ClipLoader } from "react-spinners";

export default function LocationField({
    userProfile,
    handleChange,
}: {
    userProfile: Profile;
    handleChange: (e: any) => void;
}) {
    // const [selectedLocation, setSelectedLocation] = useState("");
    const [searchParams, setSearchParams] = useState("");
    const [locations, setLocations] = useState([]);
    const [isQueryLoading, setIsQueryLoading] = useState(false);

    useEffect(() => {
        const getLocations = async () => {
            const newLocations = await fetch(
                `/api/search/locations?search=${searchParams}`
            ).then((data) => data.json().then((j) => j.locations));
            setLocations(newLocations);
            setIsQueryLoading(false);
        };

        setIsQueryLoading(true);
        getLocations();
    }, [searchParams]);

    return (
        <div className="mb-10 flex flex-row items-center justify-between">
            <label
                htmlFor="pref_location"
                className="mb-2 inline-block font-semibold leading-none"
            >
                Preferred Location
            </label>

            <div className="relative flex flex-row justify-start">
                <SearchComboBox
                    handleChange={(item) =>
                        handleChange({
                            target: {
                                id: "pref_location",
                                value: item,
                            },
                        })
                    }
                    setSearchParams={setSearchParams}
                    data={isQueryLoading ? [] : locations}
                    value={userProfile.pref_location}
                />
                {isQueryLoading && (
                    <div className="absolute right-8 top-2">
                        <ClipLoader size={20} />
                    </div>
                )}
            </div>
        </div>
    );
}
