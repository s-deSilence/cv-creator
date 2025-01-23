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
import { PDFDownloadLink } from "@react-pdf/renderer"

export const App = () => {

    return (
        <Provider store={store}>
            <div style={{ display: 'flex', height: '100vh', position: 'relative', width: '100%'}}>
                <div style={{ background: "#fafafa", width:'40%', padding: '25px' }}>
                    <Form layout="vertical">
                        <PersonalInfoForm />
                        <EmploymentHistoryForm />
                        <EducationForm />
                        <LinksForm />
                        <SkillsForm />
                        <LanguagesForm />
                    </Form>
                </div>
                <div style={{width: '60%', padding: '25px' }}>
                </div>
                <div style={{ background: "rgb(101, 110, 131)", width:'60%', position:'fixed', right: 0, top: 0, bottom:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <PDF />
                    <div className="download-wrapper">
                        <PDF download={true}/>
                    </div>
                </div>
            </div>
        </Provider>
        
    )
}