import { useRef, useState } from "react";
import ProPic from "../images/user-circle.svg";
import QRCode from "qrcode";
import ReactCardFlip from "react-card-flip";
import * as htmlToImage from "html-to-image";
import download from "downloadjs";

function Form() {
  const reader = new FileReader();
  const hiddenFileInputRef = useRef();
  const [profilePic, setProfilePic] = useState(ProPic);
  const [fields, setNewFields] = useState();
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [Error, setError] = useState("");

  const [email, setEmail] = useState(null);
  const [github, setGithub] = useState("");
  const [linkedIN, setLinkedIn] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // const [linkModalOpen, setLinkModalOpen] = useState(false);
  // const [newFieldTitle, setNewFieldTitle] = useState("");
  // const [newFieldValue, setNewFieldValue] = useState({});

  const handleClick = () => {
    hiddenFileInputRef.current.click();
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFileUpload = (event) => {
    try {
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e) => {
        // console.log(e.target.result);
        const uploadedImage = e.target.result;
        setProfilePic(uploadedImage);
      };
    } catch (error) {
      console.log("Choose Image");
    }
  };

  const generateQr = async () => {
    // e.preventDefault();
    if (
      firstName != null &&
      lastName != null &&
      email != null
      // github != null &&
      // portfolio != null &&
      // linkedIN != null
    ) {
      setIsDisabled(false);
      setNewFields({
        // profilePicture: profilePic,
        firstName: firstName,
        lastName: lastName,
        email: email,
        github: github,
        linkedIn: linkedIN,
        portfolio: portfolio,
      });
      const data = JSON.stringify(fields);
      console.log(data);

      try {
        const response = await QRCode.toDataURL(JSON.stringify(data));
        setQrImage(response);
        flipCard();
      } catch (error) {
        console.log(error);
      }
    } else {
      setError("Fill all fields");
      return;
    }
  };

  const downloadImage = () => {
    htmlToImage
      .toPng(document.getElementById("my-node"))
      .then(function (dataUrl) {
        var img = new Image();
        img.src = dataUrl;
        download(dataUrl, "my-id.png");
      });
  };

  // const addToFields = (e, title, newLink) => {
  //   e.preventDefault();
  //   console.log("from add to links function");
  //   const allFields = [...fields, { title: title, link: newLink }];
  //   console.log(fields);
  //   setNewFields(allFields);
  // };

  // const openLink = (e) => {
  //   e.preventDefault();
  //   console.log("modal open");

  //   setLinkModalOpen(true);
  // };

  // const closeModals = (e) => {
  //   e.preventDefault();

  //   linkModalOpen && setLinkModalOpen(false);

  //   console.log("modal close");
  // };

  return (
    <div className="flex place-content-center ">
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        flipSpeedFrontToBack={1}
      >
        <form className="flex flex-col gap-3 bg-white rounded shadow-xl  px-3 md:px-10 py-5 sm:w-[500px] w-fit h-fit mt-10 sm:place-self-center">
          <small className="text-rose-600">{Error && Error}</small>
          <div className="">
            {/* propile picture */}
            <div className=" grid place-content-center">
              <div className="relative">
                <img
                  src={profilePic}
                  alt="ppic"
                  className="w-32 h-32 object-cover rounded-full shadow-lg ring-2 ring-slate-400"
                />
                <label
                  htmlFor="profilePic"
                  onClick={() => handleClick}
                  className="cursor-pointer absolute -bottom-2 -right-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    className="h-10 w-10 bg-sky-500 p-2 text-3xl font-bold text-white rounded-full shadow"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </label>
              </div>
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                ref={hiddenFileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                required
              />
            </div>

            <div className="flex flex-col gap-2 mt-5">
              {/* firstname */}
              <div className="w-full h-fit  py-1 flex">
                {/* <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                  First Name{" "}
                </label> */}
                <input
                  type="text"
                  placeholder="first name"
                  className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
              </div>

              {/* lastname */}
              <div className="w-full h-fit  py-1 flex">
                {/* <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                  Last Name
                </label> */}
                <input
                  type="text"
                  placeholder="last name"
                  className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
              </div>

              {/* email */}
              <div className="w-full h-fit  py-1 flex">
                {/* <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                  Email
                </label> */}
                <input
                  type="text"
                  placeholder="email address"
                  className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="w-full h-fit  py-1 flex">
                {/* <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                  Github Link
                </label> */}
                <input
                  type="text"
                  placeholder="github username"
                  className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  onChange={(e) => {
                    setGithub(e.target.value);
                  }}
                />
              </div>

              {/* <div className="w-full h-fit  py-1 flex">
                <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                  linkedIn Link
                </label>
                <input
                  type="text"
                  placeholder="linkedin.com/userid"
                  className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  onChange={(e) => {
                    setLinkedIn(e.target.value);
                  }}
                  required
                />
              </div> */}

              {/* <div className="w-full h-fit  py-1 flex">
                <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                  Portfolio Link
                </label>
                <input
                  type="text"
                  placeholder="myportfolio.io"
                  className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  onChange={(e) => {
                    setPortfolio(e.target.value);
                  }}
                  required
                />
              </div> */}

              {/* no more need this part */}
              {/* 
            {fields.map((field, index) => {
              return (
                <div className="w-full h-fit  py-1 flex" key={index}>
                  <label className="text-base text-gray-500 col-span-1 flex-[30%]">
                    {field.title}
                  </label>
                  <input
                    type="text"
                    placeholder="field value here"
                    defaultValue={field.link}
                    className="border-0  focus:border-b-sky-500 outline-0 focus:border-b-2 rounded py-2 px-1 ml-1 flex-[70%]"
                  />
                </div>
              );
            })} */}
              {/* <button
              onClick={(e) => openLink(e)}
              className="shadow rounded py-2 text-white bg-sky-500"
            >
              Add new Field
            </button> */}

              <button
                className="shadow rounded py-2 text-white bg-green-500"
                // onClick={(e) => generateQr(e)}
                onClick={generateQr}
              >
                Generate Dev ID
              </button>

              {/* this isn't needed as well since it depends on the first one */}
              {/* {linkModalOpen && (
              <CustomModal
                heading={"Add New Field"}
                titlePlaceholder={"field name"}
                inputPlaceholder={"field value"}
                handler={(e) => addToFields(e, newFieldTitle, newFieldValue)}
                handleClose={closeModals}
                titleChangeHandler={(e) => {
                  setNewFieldTitle(e.target.value);
                }}
                changeHandler={(e) => {
                  setNewFieldValue(e.target.value);
                }}
              />
            )} */}
            </div>
          </div>
        </form>

        <div className="relative">
          {!isDisabled && (
            <label
              onClick={downloadImage}
              className="cursor-pointer fixed top-[16%] right-[26%]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                className="h-10 w-10 bg-green-500 p-2 text-3xl font-bold text-white rounded-full shadow"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                />
              </svg>
            </label>
          )}
          <div
            className="flex flex-col gap-3 bg-white rounded shadow-xl  px-3 md:px-10 py-5 sm:w-[325px] w-max  h-fit mt-10 place-self-center  "
            id="my-node"
          >
            <img
              src={profilePic}
              alt="qrImage"
              className="w-32 h-32 object-cover rounded-full shadow-lg ring-2 ring-sky-400 grid place-self-center"
            />

            <div className="flex flex-col gap-5 mt-4 text-gray-700">
              <div className="leading-3 text-center text-black font-bold">
                <h2 className="px-2 py-2">
                  {`${firstName?.toUpperCase()} ${lastName?.toUpperCase()} `}
                </h2>
                <h2 className="px-2 py-1">{email}</h2>
              </div>

              {/* <div className="flex flex-col leading-3">
                <h2 className=" text-sm font-bold text-gray-400">Github</h2>
                <span className="text-black">{github}</span>
              </div>
              <div className="flex flex-col leading-3">
                <h2 className=" text-sm font-bold text-gray-400">Portfolio</h2>
                <span>{portfolio}</span>
              </div>
              <div className="flex flex-col leading-3">
                <h2 className=" text-sm font-bold text-gray-400">linkedIn</h2>
                <span>{linkedIN}</span>
              </div> */}
              <div className="flex place-content-center flex-col">
                <img
                  src={qrImage}
                  alt="qrImage"
                  className="w-44 h-44 shadow-lg  grid place-self-center"
                />
                <small className="text-xs font-bold text-gray-600 self-center mt-5">
                  scan
                </small>
              </div>
            </div>
          </div>
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default Form;
