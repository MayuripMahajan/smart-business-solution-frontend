import Loader from "../components/loader"
import loaderCss from "../styles/loader.css"
import Sidebar from "../components/sidebar"
import Header from "../components/header"
import { useEffect, useState } from "react"
import styles from "../styles/style1.css"
import landingPageCss from "../styles/landingPage.css"
import { getCookie } from "../utils/cookies"
import { postAPI } from "~/utils/api"
import { domain } from "~/utils/domain"


const LandingPage = () => {

    const [isLoader, setIsLoader] = useState(false)

    const [qno, setQno] = useState(0)

    const [qa, setQA] = useState({})

    const [questions, setQuestions] = useState([
        {
            qid: "owner",
            question: "Enter owner email id",
            answer: qa?.email
        },
        {
            qid: "companyName",
            question: "Enter company name",
            answer: ""
        },
        {
            qid: "shortDescription",
            question: "Enter short description about your company",
            answer: ""
        },
        {
            qid: "email",
            question: "Enter email",
            answer: ""
        },
        {
            qid: "phone1",
            question: "Enter contact number",
            answer: ""
        },
        {
            qid: "phone2",
            question: "Enter alternate contact number",
            answer: ""
        },
        // {
        //     qid: "aboutCompany",
        //     question: "Enter about company in brief",
        //     answer: ""
        // },
        {
            qid: "aboutCompanyDetails",
            question: "Enter about comapny details",
            answer: ""
        },
        // {
        //     qid: "services",
        //     question: "Enter services",
        //     answer: ""
        // },
        // {
        //     qid: "servicesTagline",
        //     question: "Enter service list",
        //     answer: ""
        // },
        {
            qid: "servicesList",
            question: "Enter service details",
            answer: []
        },
        // {
        //     qid: "ctaTagLine",
        //     question: "Enter CTA (click to action) tagline",
        //     answer: ""
        // },
        // {
        //     qid: "testimonials",
        //     question: "Enter testimonial",
        //     answer: ""
        // },
        // {
        //     qid: "testimonialTagline",
        //     question: "Enter testimonial tagline",
        //     answer: ""
        // },
        {
            qid: "testimonialList",
            question: "Enter testimonial list",
            answer: []
        },
        {
            qid: "address",
            question: "Enter company address",
            answer: ""
        },

        {
            qid: "teamMember",
            question: "Enter Team Members ",
            answer: []
        }
    ])

    useEffect(() => {
        userData()
    }, [])


    const userData = async () => {
        await getCookie("UD").then((res) => {
            console.log(JSON.parse(res))
            setQA((prev) => {
                return {
                    ...prev,
                    email: JSON.parse(res)?.email
                }
            })
            setQuestions((prev) => {
                let newQuestion = [...prev]
                newQuestion[0].answer = JSON.parse(res)?.email
                return newQuestion
            })
            // allprojects(JSON.parse(res).email)
        })
    }

    const updateAns = (ans) => {
        setQuestions((prev) => {
            return prev.map((q) => {
                if (q.qid == "servicesList") {
                    
                } else
                    if (q.question === questions[qno].question) {
                        return {
                            ...q,
                            answer: ans
                        }
                    }
                return q
            })
        })
        // questions[qno]?.answer = ans
    }



    const generatePage = async () => {
        for (let i = 0; i < questions?.length; i++) {
            setQA((prev) => {
                return {
                    ...prev,
                    [questions[i]?.qid]: questions[i]?.answer
                }
            })
        }

        const response = await postAPI(`${domain}/api/landingpage/generate`, JSON.stringify(qa))

        console.log(response)

    }

    useEffect(() => {
        console.log(questions)
    }, [questions])
    useEffect(() => {
        console.log(qa)
    }, [qa])

    // const updateObject = (id, updatedValue) => {
    //     setYourArray(prevArray =>
    //       prevArray.map(obj => (obj.id === id ? { ...obj, value: updatedValue } : obj))
    //     );
    //   };

    return (
        <>
            <Loader isShow={isLoader} />
            <Sidebar />

            <div className="main-content">
                <Header />


                <div className="gs-form">
                    <div className="question">
                        <p>{questions[qno]?.question}</p>
                    </div>

                    {
                        questions[qno]?.qid == "servicesList" ?
                            <>
                                <div className="answer">
                                    <input type="text" placeholder={questions[qno]?.question}
                                        onChange={(e) => {
                                            updateAns(e.target.value)
                                        }}
                                        value={questions[qno]?.answer}
                                    />
                                </div>

                            </>
                            :
                            <div className="answer">
                                <input type="text" placeholder={questions[qno]?.question}
                                    onChange={(e) => {
                                        updateAns(e.target.value)
                                    }}
                                    value={questions[qno]?.answer}
                                />
                            </div>

                    }

                    <div className="gs-btn">
                        {
                            qno == 0 ? null :
                                <button onClick={() => setQno(() => qno - 1)}>BACK</button>
                        }
                        {/* <button>SKIP</button> */}
                        {
                            qno == questions?.length - 1 ?
                                <button onClick={() => generatePage()}>Submit</button>

                                :
                                <button onClick={() => setQno(() => qno + 1)}>NEXT</button>
                        }
                    </div>
                </div>









            </div>

        </>
    )
}

export default LandingPage

export const links = () => [
    {
        rel: "stylesheet",
        href: styles
    },
    {
        rel: "stylesheet",
        href: loaderCss
    },
    {
        rel: "stylesheet",
        href: landingPageCss
    }
]