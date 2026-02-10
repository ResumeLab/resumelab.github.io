import {createContext, type ReactNode, useContext, useState} from 'react';
import type {ResumeData} from "./resume-types.tsx";
import {FileResumeDataParser} from "../service/file-resume-data-parser.ts";
import {FileApiWrapper} from "../service/file-api-wrapper.ts";
import {FileTreeChangeDetector} from "../service/file-change-detector.ts";

type UserDataContextValue = {
    data: ResumeData | undefined;
    selectFolder: () => Promise<void>;
};

const UserDataContext = createContext<UserDataContextValue>({
    data: undefined,
    selectFolder: () => {
        throw new Error("Context not loaded")
    }
});

export function UserDataProvider({children}: { children: ReactNode }) {
    const [resumeData, setResumeData] = useState<ResumeData | undefined>(undefined);

    const selectFolder = async () => {
        if (!("showDirectoryPicker" in window)) {
            // throw new Error("This browser not support showDirectoryPicker");
            return;
        }

        const handle: FileSystemDirectoryHandle = await (window as any).showDirectoryPicker({
            mode: "read"
        });

        const fileApi = new FileApiWrapper(handle);
        const changeDetector = new FileTreeChangeDetector(fileApi);
        await changeDetector.init();
        const resumeDataParser = new FileResumeDataParser(fileApi);
        const resumeData = await resumeDataParser.getResumeData();
        setResumeData(resumeData);

        setInterval(async () => {
            if (await changeDetector.hasChanges()) {
                console.log("Change detected!");
                const resumeData = await resumeDataParser.getResumeData();
                setResumeData(resumeData);
            }
        }, 1000)
    };

    return (
        <UserDataContext.Provider value={{data: resumeData, selectFolder}}>
            {children}
        </UserDataContext.Provider>
    );
}

export function useUserDataContext(): UserDataContextValue {
    const ctx = useContext(UserDataContext);
    if (!ctx) {
        throw new Error('useUserData must be used inside <UserDataProvider>.');
    }
    return ctx;
}