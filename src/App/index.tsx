import { Form } from "antd"
import { PersonalInfoForm } from "../PersonalInfoForm"
import { Provider } from "react-redux"
import { store } from "../store/store"
import { EmploymentHistoryForm } from "../EmploymentHistoryForm"
import { EducationForm } from "../EducationForm"
import { PDF } from "../PDF"
import { LinksForm } from "../LinksForm"
import { LanguagesForm } from "../LanguagesForm"
import { SkillsForm } from "../SkillsForm"

export const App = () => {

    return (
        <Provider store={store}>
            <div className="app-wrapper">
                <div className="app-left">
                    <Form layout="vertical">
                        <PersonalInfoForm />
                        <EmploymentHistoryForm />
                        <EducationForm />
                        <LinksForm />
                        <SkillsForm />
                        <LanguagesForm />
                    </Form>
                </div>
                <div className="app-fake_right" />
                <div className="app-right">
                    <PDF />
                    <div className="download-wrapper">
                        <PDF download={true}/>
                    </div>
                </div>
            </div>
        </Provider>
        
    )
}