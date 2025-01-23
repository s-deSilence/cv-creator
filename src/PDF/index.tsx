import { Document, Image, Page, StyleSheet, Text, View, PDFViewer, Font } from "@react-pdf/renderer";
import { FC } from "react";
import { useSelector } from "react-redux";
import { StoreType } from "../store/store";
import { PhonePDFIcon } from "../resources/phonePDFIcon";
import { MailPDFIcon } from "../resources/mailPDFIcon";
import { LocationPDFIcon } from "../resources/locationPDFIcon";
import { TelegramPDFIcon } from "../resources/telegramPDFIcon";
import { GitHubPDFIcon } from "../resources/gitHubPDFIcon";
import { LinkedInPDFIcon } from "../resources/linkedinPDFIcon";

Font.register({ family: 'Roboto', src: 'http://fonts.gstatic.com/s/roboto/v16/zN7GBFwfMP4uA6AR0HCoLQ.ttf' });

const styles = StyleSheet.create({
    wrapper: {
        width:'100%',
        height:'100%',
        display:'flex',
        flexDirection: 'row',
        fontFamily: "Roboto"
    },
    left: {
        width: '33%',
        height: '100%',
        backgroundColor: '#00182c'
    },
    right: {
        width: '67%',
        height: '100%',
        paddingTop: '40px'
    },
    avatar: {
        width: '100px',
        height: '100px',
        borderRadius: '50%'
    },
    avatarWrapper: {
        width: '100%',
        paddingTop: '45px',
        paddingBottom: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    personalInfoTitle: {
        borderBottom: '2px solid white',
        color: 'white',
        paddingLeft: '25px',
        fontSize: '14px',
        paddingBottom: '2px',
        paddingTop: '15px',
        marginBottom: '5px'
    },
    name: {
        fontSize: '32px',
        paddingLeft: '30px',
        fontWeight: 300
    },
    jobTitle: {
        paddingLeft: '30px',
        fontSize: '16px',
        fontWeight: 300
    },
    summary: {
        paddingLeft: '30px',
        fontSize: '12px',
        paddingTop: '20px',
        paddingRight: '30px',
        lineHeight: '16px',
        textAlign: 'justify',
        paddingBottom: '10px'
    },
    sectionTitle: {
        paddingLeft: '25px',
        borderBottom: '1px solid #000',
        fontSize: '14px',
        paddingTop: '20px'
    },
    iconWrapper: {
        width: '16px',
        height: '16px',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%'
    },
    leftSectionWrapper: {
        paddingLeft: '25px',
        marginBottom: '4px',
        marginTop: '4px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftSectionValue: {
        color: '#fff',
        fontSize: '8px',
        paddingLeft: '8px'
    },
    langWrapper: {
        paddingLeft: '25px',
        paddingRight: '25px',
        marginTop: '6px'
    },
    langDescWrapper: {
        color: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    langTitle: {
        fontSize: '12px'
    },
    langDesc: {
        fontSize: '10px'
    },
    langItemsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '3px',
        marginTop: '3px'
    },
    langItem: {
        width: '26px',
        height: '6px',
        backgroundColor: "#fff",
        borderTopLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    },
    langItemEmpty: {
        width: '26px',
        height: '6px',
        backgroundColor: "#999",
        opacity: 0.4,
        borderTopLeftRadius: '20px',
        borderBottomRightRadius: '20px'
    },
    experienceWrapper: {
        paddingLeft: '25px',
        paddingRight: '25px',
        paddingTop: '10px'
    },
    experienceItemTitle: {
        fontSize: '13px',
        fontWeight: 700,
    },
    experienceItemDate: {
        fontSize: '11px',
        color: 'gray'
    },
    experienceItemDesc: {
        fontSize: '12px',
        lineHeight: '18px',
        paddingTop: '5px'
    }
})

//waiting for crush fix in https://github.com/diegomura/react-pdf/issues/2978

export const PDF:FC = () => {

    const { firstName, lastName, jobTitle, photo, summary, phone, email, city } = useSelector((state:StoreType) => state.personal.main);
    const { education, employments, languages, skills } = useSelector((state:StoreType) => state.personal)
    const { telegram, github, linkedin} = useSelector((state:StoreType) => state.personal.links);

    return (
        <PDFViewer width={'430px'} height={"605px"} showToolbar={false}>
            <Document>
                <Page>
                    <View style={styles.wrapper}>
                        <View style={styles.left}>
                            <View style={styles.avatarWrapper}>
                                <Image src={photo} style={styles.avatar} cache={false} />
                            </View>
                            <Text style={styles.personalInfoTitle}>Personal Info</Text>
                            <View style={styles.leftSectionWrapper}>
                                <View style={styles.iconWrapper}>
                                    <PhonePDFIcon />
                                </View>
                                <Text style={styles.leftSectionValue}>{phone}</Text>
                            </View>
                            <View style={styles.leftSectionWrapper}>
                                <View style={styles.iconWrapper}>
                                    <MailPDFIcon />
                                </View>
                                <Text style={styles.leftSectionValue}>{email}</Text>
                            </View>
                            <View style={styles.leftSectionWrapper}>
                                <View style={styles.iconWrapper}>
                                    <LocationPDFIcon />
                                </View>
                                <Text style={styles.leftSectionValue}>{city}</Text>
                            </View>
                            { telegram && ( <View style={styles.leftSectionWrapper}>
                                <View style={styles.iconWrapper}>
                                    <TelegramPDFIcon />
                                </View>
                                <Text style={styles.leftSectionValue}>{telegram}</Text>
                            </View> )}
                            { github && ( <View style={styles.leftSectionWrapper}>
                                <View style={styles.iconWrapper}>
                                    <GitHubPDFIcon />
                                </View>
                                <Text style={styles.leftSectionValue}>{github}</Text>
                            </View> )}
                            { linkedin && ( <View style={styles.leftSectionWrapper}>
                                <View style={styles.iconWrapper}>
                                    <LinkedInPDFIcon />
                                </View>
                                <Text style={styles.leftSectionValue}>{linkedin}</Text>
                            </View> )}
                            <Text style={styles.personalInfoTitle}>Skills</Text>
                            { skills.map((skill, idx) => (
                                <View key={idx} style={styles.langWrapper}>
                                    <View style={styles.langDescWrapper}>
                                        <Text style={styles.langTitle}>{skill.name}</Text>
                                        <Text style={styles.langDesc}>{skill.exp}</Text>
                                    </View>
                                    <View style={styles.langItemsWrapper}>
                                        { Array(5).fill("").map((_,idx) => (
                                            <View style={ idx <= skill.level ? styles.langItem : styles.langItemEmpty } key={idx}/>
                                        ))}
                                    </View>
                                </View>
                            ))}
                            <Text style={styles.personalInfoTitle}>Languages</Text>
                            { languages.map((lang, idx) => (
                                <View key={idx} style={styles.langWrapper}>
                                    <View style={styles.langDescWrapper}>
                                        <Text style={styles.langTitle}>{lang.lang}</Text>
                                        <Text style={styles.langDesc}>{lang.levelDesc}</Text>
                                    </View>
                                    <View style={styles.langItemsWrapper}>
                                        { Array(5).fill("").map((_,idx) => (
                                            <View style={ idx <= lang.level ? styles.langItem : styles.langItemEmpty } key={idx}/>
                                        ))}
                                    </View>
                                </View>
                            ))}
                        </View>
                        <View style={styles.right}>
                            <Text style={styles.name}>{firstName} {lastName}</Text>
                            <Text style={styles.jobTitle}>{jobTitle}</Text>
                            <Text style={styles.summary}>{summary}</Text>
                            <Text style={styles.sectionTitle}>Work Experience</Text>
                            { employments.map((employment, idx) => (
                                <View key={idx} style={styles.experienceWrapper}>
                                    <Text style={styles.experienceItemTitle}>{employment.title}, {employment.employer}, {employment.city} </Text>
                                    <Text style={styles.experienceItemDate}>{employment.startDate} - {employment.endDate}</Text>
                                    <Text style={styles.experienceItemDesc}>{employment.description}</Text>
                                </View>
                            ))}
                            <Text style={styles.sectionTitle}>Education</Text>
                            { education.map((education, idx) => (
                                <View key={idx} style={styles.experienceWrapper}>
                                    <Text style={styles.experienceItemTitle}>{education.degree}, {education.title} </Text>
                                    <Text style={styles.experienceItemDate}>{education.startDate} - {education.endDate}</Text>
                                    <Text style={styles.experienceItemDesc}>{education.description}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
        
    )
} 