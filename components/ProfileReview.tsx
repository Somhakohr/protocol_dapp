import { useEffect, useState } from "react";
import { Profile } from "../constants/types";
import * as changeCase from "change-case";
import { axiosAPIInstance } from "../constants/axiosInstances";
import { ProfileFormSkeleton } from "./skeletons";

export default function ProfileSummary({
    profile,
    handleMint,
    handleRejection,
}: {
    profile: Profile;
    handleMint: (profile: Profile) => void;
    handleRejection: (profile: Profile) => void;
}) {
    console.log(profile);
    const getExperience = (profile: Profile) =>
        profile.experience.map((experience, key) => (
            <div key={key} className="my-2">
                <label className="text-lg font-bold  mb-2 leading-none inline-block">
                    Experience #{key + 1}
                </label>
                <div
                    className="my-6  flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="organization"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Organization
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {experience.organization}
                    </label>
                </div>
                <div
                    className="my-6 flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="startYear"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Start Year
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {experience.startYear}
                    </label>
                </div>
                <div
                    className="my-6  flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="endYear"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        End Year
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {experience.endYear}
                    </label>
                </div>
                <div
                    className="my-6  flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="title"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Title
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {experience.title}
                    </label>
                </div>
            </div>
        ));

    const getEducation = (profile: Profile) =>
        profile.education.map((education, key) => (
            <div key={key} className="my-2">
                <label className="text-lg font-bold mb-2 leading-none inline-block">
                    Education #{key + 1}
                </label>
                <div
                    className="my-6  flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="institution"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Institution
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {education.institution}
                    </label>
                </div>
                <div
                    className="my-6 flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="title"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Title
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {education.title}
                    </label>
                </div>
                <div
                    className="my-6  flex justify-between items-center"
                    key={key}
                >
                    <label
                        htmlFor="year"
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Year
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {education.year}
                    </label>
                </div>
            </div>
        ));

    const getSkills = (profile: Profile) =>
        profile.skills.map((skill, key) => (
            <div key={key}>
                <div className="my-1">
                    <label
                        htmlFor={key.toString()}
                        className="font-medium mb-2 leading-none inline-block"
                    >
                        Skill #{key + 1}
                    </label>
                    <label
                        id={key.toString()}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {skill}
                    </label>
                </div>
            </div>
        ));
    const ProfileInfo = profile ? (
        Object.keys(profile).map((key) => {
            if (key === "experience") return getExperience(profile);
            if (key === "education") return getEducation(profile);
            if (key === "skills") return getSkills(profile);
            if (key === "user_id" || key === "minted") return;

            let label: string = changeCase.sentenceCase(key);
            const value: string = profile[key as keyof Profile].toString();
            if (key === "prefLocation") label = "Preferred Location";

            return (
                <div className="my-2" key={key}>
                    <label
                        htmlFor={key}
                        className="font-medium text-base mb-2 leading-none inline-block"
                    >
                        {label}
                    </label>
                    <label
                        id={key}
                        className="font-medium text-base w-auto mx-4 "
                    >
                        {value}
                    </label>
                </div>
            );
        })
    ) : (
        <ProfileFormSkeleton />
    );
    return (
        <div className="container">
            <div className="w-full max-w-[1000px] mx-auto my-10 bg-white shadow-normal border border-slate-700 rounded-[25px] p-8 md:py-14 md:px-20 flex flex-col justify-center items-center">
                <h2 className="font-semibold text-lg md:text-3xl mb-4">
                    Profile Summary (User ID #{profile.user_id})
                </h2>
                <div className="grid">{ProfileInfo}</div>
                <div className="grid grid-cols-2 gap-20 pt-11">
                    <button
                        onClick={() => handleRejection(profile)}
                        className=" bg-gradient-to-r from-[#a85959] to-somhakohr text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                    >
                        Reject
                    </button>
                    <button
                        onClick={() => handleMint(profile)}
                        className=" bg-gradient-to-r from-[#6D27F9] to-somhakohr text-white font-bold rounded-full py-2.5 px-6 md:min-w-[150px] transition-all hover:from-[#391188] hover:to-[#391188]"
                    >
                        Approve
                    </button>
                </div>
            </div>
        </div>
    );
}