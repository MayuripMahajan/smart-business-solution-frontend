import Loader from "../components/loader";
import loaderCss from "../styles/loader.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import { useEffect, useState } from "react";
import styles from "../styles/style1.css";
import landingPageCss from "../styles/landingPage.css";
import { getCookie } from "../utils/cookies";
import { postAPI, imageUploadAPI } from "~/utils/api";
import { domain, imgServer } from "~/utils/domain";

const LandingPage = () => {
  const [isLoader, setIsLoader] = useState(false);

  const [qno, setQno] = useState(0);

  const [qa, setQA] = useState({});

  const [questions, setQuestions] = useState([
    {
      qid: "owner",
      question: "Enter owner email id",
      answer: qa?.email,
    },
    {
      qid: "companyName",
      question: "Enter company name",
      answer: "",
    },
    {
      qid: "shortDescription",
      question: "Enter short description about your company",
      answer: "",
    },
    {
      qid: "email",
      question: "Enter email",
      answer: "",
    },
    {
      qid: "phone1",
      question: "Enter contact number",
      answer: "",
    },
    {
      qid: "phone2",
      question: "Enter alternate contact number",
      answer: "",
    },
    // {
    //     qid: "aboutCompany",
    //     question: "Enter about company in brief",
    //     answer: ""
    // },
    {
      qid: "aboutCompanyDetails",
      question: "Enter about comapny details",
      answer: "",
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
      question: "Enter service name",
      answer: [
        // {
        //     title: "",
        //     imgURL: ""
        // }
      ],
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
    // {
    //   qid: "testimonialList",
    //   question: "Enter testimonial list",
    //   answer: [],
    // },
    {
      qid: "address",
      question: "Enter company address",
      answer: "",
    },

    {
      qid: "teamMember",
      question: "Enter Team Members ",
      answer: [],
    },
  ]);

  const [servicesList, setServicesList] = useState({
    title: "",
    description: "",
    img: "",
  });

  const [teamMember, setTeamMember] = useState("");

  useEffect(() => {
    userData();
  }, []);

  const userData = async () => {
    await getCookie("UD").then((res) => {
      console.log(JSON.parse(res));
      setQA((prev) => {
        return {
          ...prev,
          email: JSON.parse(res)?.email,
        };
      });
      setQuestions((prev) => {
        let newQuestion = [...prev];
        newQuestion[0].answer = JSON.parse(res)?.email;
        return newQuestion;
      });
      // allprojects(JSON.parse(res).email)
    });
  };

  const updateAns = (ans) => {
    setQuestions((prev) => {
      return prev.map((q) => {
        console.log(q.qid);
        if (q.qid == "servicesList" && questions[qno].qid == "servicesList") {
          console.log("service list k andar");
          let newAns = [...q.answer, ans];
          return {
            ...q,
            answer: newAns,
          };
        } else if (
          q.qid == "teamMember" &&
          questions[qno].qid == "teamMember"
        ) {
          console.log("team member  k andar");
          let newAns = [...q.answer, ans];
          return {
            ...q,
            answer: newAns,
          };
        } else if (q.question == questions[qno].question) {
          console.log("normal  k andar");

          return {
            ...q,
            answer: ans,
          };
        }
        return q;
      });
    });
    setQAFunc();
    // questions[qno]?.answer = ans
  };

  const setQAFunc = () => {
    for (let i = 0; i < questions?.length; i++) {
      setQA((prev) => {
        return {
          ...prev,
          [questions[i]?.qid]: questions[i]?.answer,
        };
      });
    }
  };
  const generatePage = async () => {
    try {
      setIsLoader(true);
      for (let i = 0; i < questions?.length; i++) {
        setQA((prev) => {
          return {
            ...prev,
            [questions[i]?.qid]: questions[i]?.answer,
          };
        });
      }
      await setQAFunc();
      await setTimeout(async () => {
        const response = await postAPI(
          `${domain}/api/landingpage/generate`,
          JSON.stringify(qa)
        );
        await setTimeout(() => {
          setIsLoader(false);
          alert(response?.message);
        }, [5000]);
      });

      console.log(response);
    } catch (err) {
      setTimeout(() => {
        setIsLoader(false);
      }, [5000]);

      console.log("Something went wrong");
    }
  };

  useEffect(() => {
    console.log(questions);
  }, [questions]);
  useEffect(() => {
    console.log(qa);
  }, [qa]);

  const uploadImg = async (e) => {
    setIsLoader(true);
    const formData = new FormData();

    const ee = e.target.files;
    console.log("eeee", ee);

    for (let i = 0; i < ee.length; i++) {
      formData.append("images", e.target.files[i]);
    }

    const response = await imageUploadAPI(
      `${imgServer}/api/product/uploadimg`,
      formData
    );
    console.log(response);
    if (response.success) {
      console.log("success", response);

      setServicesList((prev) => {
        return {
          ...prev,
          img: response?.filename[0],
        };
      });

      setIsLoader(false);
    }
    console.log("Response", response);
  };
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

          {questions[qno]?.qid == "servicesList" ? (
            <>
              <div className="answer mcq">
                <input
                  type="text"
                  placeholder={"Enter Service"}
                  onChange={(e) => {
                    setServicesList((prev) => {
                      return {
                        ...prev,
                        title: e.target.value,
                      };
                    });
                  }}
                  value={servicesList?.title}
                />
              </div>
              <div className="answer mcq">
                <input
                  type="text"
                  placeholder={"Enter Description"}
                  onChange={(e) => {
                    setServicesList((prev) => {
                      return {
                        ...prev,
                        description: e.target.value,
                      };
                    });
                  }}
                  value={servicesList?.description}
                />
              </div>
              <div className="answer mcq">
                <input
                  type="file"
                  name="images"
                  placeholder={questions[qno]?.question}
                  onChange={(e) => {
                    uploadImg(e);
                  }}
                  // value={questions[qno]?.answer}
                />
              </div>
              <button
                onClick={() => {
                  updateAns(servicesList);
                  setServicesList({
                    title: "",
                    description: "",
                    img: "",
                  });
                }}
                style={{
                  background: "#7163BA",
                  padding: "13px 30px",
                  borderRadius: "12px",
                  zIndex: "3",
                  marginLeft: "80px",
                  marginTop: "10px",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "24px",
                }}
              >
                Add
              </button>

              <div className="services-box">
                {questions[qno]?.answer?.map((q) => {
                  return (
                    <div className="box">
                      <img src={`${imgServer}/imgs/${q?.img}`} alt="" />
                      <p>{q.title}</p>
                      <p>{q.description}</p>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              {questions[qno]?.qid == "teamMember" ? (
                <>
                  <div className="answer">
                    <input
                      type="text"
                      placeholder="Enter Email Address"
                      onChange={(e) => {
                        setTeamMember(e.target.value);
                      }}
                      value={teamMember}
                    />
                  </div>

                  <button
                    onClick={() => {
                      updateAns(teamMember);
                      setTeamMember("");
                    }}
                    style={{
                      background: "#7163BA",
                      padding: "13px 30px",
                      borderRadius: "12px",
                      zIndex: "3",
                      marginLeft: "80px",
                      marginTop: "10px",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "24px",
                    }}
                  >
                    Add
                  </button>

                  <div className="team-member">
                    {questions[qno]?.answer?.map((q) => {
                      return <p>{q}</p>;
                    })}
                  </div>
                </>
              ) : (
                <div className="answer">
                  <input
                    type="text"
                    placeholder={questions[qno]?.question}
                    onChange={(e) => {
                      updateAns(e.target.value);
                    }}
                    value={questions[qno]?.answer}
                  />
                </div>
              )}
            </>
          )}

          <div className="gs-btn">
            {qno == 0 ? null : (
              <button onClick={() => setQno(() => qno - 1)}>BACK</button>
            )}
            {/* <button>SKIP</button> */}
            {qno == questions?.length - 1 ? (
              <button onClick={() => generatePage()}>Submit</button>
            ) : (
              <button onClick={() => setQno(() => qno + 1)}>NEXT</button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;

export const links = () => [
  {
    rel: "stylesheet",
    href: styles,
  },
  {
    rel: "stylesheet",
    href: loaderCss,
  },
  {
    rel: "stylesheet",
    href: landingPageCss,
  },
];
