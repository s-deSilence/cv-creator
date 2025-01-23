import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmploymentType } from "../../types/employments";
import { EducationType } from "../../types/education";
import { avatarSrc } from "../../resources/avatarSrc";
import { LanguageType } from "../../types/language";
import { SkillType } from "../../types/skill";

type PersonalInfoReducerType = {
    main: {
        jobTitle: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        country: string,
        city: string,
        summary: string,
        photo: string
    },
    links: {
        telegram: string,
        linkedin: string,
        github: string,
    },
    employments: EmploymentType[],
    education: EducationType[],
    skills: SkillType[],
    languages: LanguageType[]
}

const initialState:PersonalInfoReducerType = {
    main: {
        jobTitle: "React Developer",
        firstName: "Andrii",
        lastName: "Dudariev",
        email: "dudarievandriy@gmail.com",
        phone: "0931305984",
        country: "Ukraine",
        city: "Odesa",
        summary: "I have more than 5 years experience with frontend development. \nMy strongest skills are React and Typescript. \nI have a high level of attention to detail, I'm a responsible and friendly team player. \nLooking for: to take on new challenges and learn new things, work with modern technologies and a positive team atmosphere. Particularly interested in creating complex and interesting interfaces or logic for them",
        photo: avatarSrc
    },
    links: {
        telegram: "@duanyu10",
        linkedin: "www.linkedin.com/in/desilence",
        github: "https://github.com/s-deSilence",
    },
    employments: [{
        title: 'Frontend Developer',
        employer: 'Obliksoft',
        startDate: '01/2019',
        endDate: '06/2020',
        city: 'Poltava',
        description: "- Marketplace's apps development \n- Websites development \n- Existing projects maintenance"
    },{
        title: 'React Developer + Team Lead',
        employer: 'InBoost',
        startDate: '06/2020',
        endDate: '07/2022',
        city: 'Remoted',
        description: "- CRM platform development \n- Chatbot constructor development \n- Booking tools development \n- Estimating and technologies selection"
    },{
        title: 'React Developer',
        employer: 'Sagax Software',
        startDate: '08/2022',
        endDate: '12/2024',
        city: 'Remoted',
        description: "- CRM platform development \n- Existing projects maintenance"
    }],
    education: [{
        title: 'Poltava College of Food Technologies',
        startDate: '09/2015',
        endDate: '07/2019',
        city: 'Poltava',
        degree: 'Junior Specialist',
        description: 'Computer Networks'
    },{
        title: 'National University "Yuri Kondratyuk Poltava Polytechnic"',
        startDate: '09/2019',
        endDate: '06/2022',
        city: 'Poltava',
        degree: 'Bachelor',
        description: 'Computer Science'
    }],
    languages: [{ lang: 'Ukrainian', level: 4, levelDesc: 'Native Speaker'}, { lang: 'English', level: 2, levelDesc: 'Upper-Intermediate'}],
    skills: [{
        name: 'React',
        level: 4,
        exp: '>5 years'
    }, {
        name: 'JS/Typescript',
        level: 4,
        exp: '>5 years'
    }, {
        name: 'HTML/CSS/SASS',
        level: 4,
        exp: '>6 years'
    }, {
        name: 'Redux',
        level: 4,
        exp: '>4 years'
    }, {
        name: 'Next',
        level: 2,
        exp: '>0.5 years'
    }, {
        name: 'React Native',
        level: 2,
        exp: '>0.5 years'
    }, {
        name: 'Webpack',
        level: 3,
        exp: '>3 years'
    }, {
        name: 'Vite',
        level: 3,
        exp: '>1.5 years'
    }, {
        name: 'Git',
        level: 4,
        exp: '>5 years'
    }, {
        name: 'Jest/RTL',
        level: 2,
        exp: '>1 year'
    }]
}

const personalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState,
    reducers: {
        setMainInfo(state, action:PayloadAction<Partial<PersonalInfoReducerType["main"]>>){
            state.main = {
                ...state.main,
                ...action.payload
            }
        },
        setEmployments(state, action: PayloadAction<EmploymentType[]>){
            state.employments = JSON.parse(JSON.stringify(action.payload))
        },
        setEducation(state, action:PayloadAction<EducationType[]>){
            state.education = JSON.parse(JSON.stringify(action.payload))
        },
        setLinks(state, action:PayloadAction<Partial<PersonalInfoReducerType["links"]>>){
            state.links = {
                ...state.links,
                ...action.payload
            }
        },
        setSkills(state, action: PayloadAction<SkillType[]>){
            state.skills = JSON.parse(JSON.stringify(action.payload))
        },
        setLanguages(state, action: PayloadAction<LanguageType[]>){
            state.languages = JSON.parse(JSON.stringify(action.payload))
        }
    }
})

export const { setMainInfo, setEmployments, setEducation, setLinks, setSkills, setLanguages } = personalInfoSlice.actions

export const defaultFormData = initialState; 

export default personalInfoSlice.reducer