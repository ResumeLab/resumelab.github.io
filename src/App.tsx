import {UserDataProvider, useUserDataContext} from "./contexts/user-data-context.tsx";
import {ResumeDocument} from "./components/resume/resume-document.tsx";
import {PaperViewWrapper} from "./components/paper-view-wrapper.tsx";

function App() {
    return (
        <UserDataProvider>
            <ResumePageInner/>
        </UserDataProvider>
    )
}

function ResumePageInner() {
    const context = useUserDataContext();

    if (!context.data) {
        return (
            <button onClick={() => {
                context.selectFolder()
            }}>Select directory</button>
        )
    }

    return (
        <PaperViewWrapper>
            <ResumeDocument data={context.data}/>
        </PaperViewWrapper>
    )
}

export default App
