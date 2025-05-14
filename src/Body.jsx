import { useState } from "react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { CiLink } from "react-icons/ci";
import { FaGitAlt, FaHtml5, FaNodeJs } from "react-icons/fa";
import {
  IoCodeSlashOutline,
  IoLogoCss3,
  IoLogoJavascript,
  IoLogoReact,
} from "react-icons/io5";
import { SiTailwindcss, SiTypescript } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";

function Body() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(name, email, message);
  }

  return (
    <section id="home">
      <div className="pt-8 flex  justify-center gap-8 md:justify-between items-center flex-wrap px-4">
        <h1 className="text-5xl font-extrabold left-14">
          Hello👋,
          <br />
          My name is <br />
          <span className="bg-gradient-to-r from-blue-500 to-red-300 bg-clip-text text-transparent">
            Odekunle Ayishat{" "}
          </span>
          <br />I build things for web
        </h1>
        <div className="h-[349px] w-[349px] rounded-full overflow-hidden bg-blue-600 bg-gradient-circle">
          <img
            src="../public/images/IMG_1640 (1).jpg"
            className="w-[100%] h-[100%] rounded-full object-cover p-2"
            alt=""
          />
        </div>
      </div>

      {/* Tech stack */}
      <div className="mt-20" id="tech">
        <h1 className="text-center text-[30px] font-bold mb-4">
          My Tech Stack
        </h1>
        <p className="text-center text-[23px] font-medium mb-10">
          {" "}
          Technologies I’ve been working with recently
        </p>
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay]}
          className="px-2"
        >
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-orange-600">
                <FaHtml5 />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Html</h3>
                <p>2.5 years experience</p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-blue-600">
                <IoLogoCss3 />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">CSS</h3>
                <p>2 years experience</p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-yellow-400">
                <IoLogoJavascript />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Javascript</h3>
                <p>1.5 years experience</p>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-blue-300">
                <IoLogoReact />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">React</h3>
                <p>1 years experience</p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-black">
                <TbBrandNextjs />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Next</h3>
                <p>3 month experience</p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-blue-400">
                <SiTailwindcss />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Tailwind</h3>
                <p>7 month experience</p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-blue-500">
                <SiTypescript />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">TypeScript</h3>
                <p>2 month experience</p>
              </div>
            </article>
          </SwiperSlide>
          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-green-600">
                <FaNodeJs />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">NodeJs</h3>
                <p>2 years experience</p>
              </div>
            </article>
          </SwiperSlide>

          <SwiperSlide>
            <article className="flex gap-2 items-center p-2 rounded-sm border border-blue-300 shadow-sm">
              <div className="text-8xl text-orange-600">
                <FaGitAlt />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-semibold">Git & Github</h3>
                <p>2 years experience</p>
              </div>
            </article>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Project section */}

      <div className="mt-[106px] mb-[100px] px-4" id="project">
        <h1 className="text-5xl font-bold text-center my-4 text-[#42446E]">
          Projects
        </h1>
        <h3 className="text-3xl text-center font-medium text-[#666666] mb-[96px]">
          Things I’ve built so far
        </h3>

        <main className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-2 justify-center gap-6 mb-8 px-2 md:px-0">
          <article className="items-center bg-white shadow-xl rounded-b-lg">
            <div className="h-[240px] pb-[17px]">
              <img
                src="/images/invoice.JPG"
                alt="Image of website"
                className="w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="px-[18px] bg-white rounded-b-lg">
              <h2 className="text-xl text-[#000000] font-bold mb-[17px]">
                Invoice App
              </h2>
              <p className="text-base mb-[12px]">
                This is an Invoice App project where authenticated user can
                create,edit and delete an invoice, only user granted to be an
                admin can mark invoice as paid
              </p>
              <p className="text-[#666666] text-sm mb-[21px]">
                Tech stack : React, Tailwind, TypeScript, Node, Express, MongoDb
              </p>
              <div className="flex justify-center gap-x-[48px] items-center mb-2">
                <a
                  href="https://omoola-invoice.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-500 font-bold text-2xl"
                >
                  <CiLink />
                </a>
                <a
                  href="https://github.com/Omo-ola/Invoice-Project"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <IoCodeSlashOutline />
                </a>
              </div>
            </div>
          </article>
          <article className="items-center bg-white shadow-xl rounded-b-lg">
            <div className="h-[240px] pb-[17px]">
              <img
                src="/images/rMovie.PNG"
                alt="Image of website"
                className="w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="px-[18px] bg-white rounded-b-lg">
              <h2 className="text-xl text-[#000000] font-bold mb-[17px]">
                Movie Search
              </h2>
              <p className="text-base mb-[12px]">
                This is a challenge given,I made use of an API to get almost all
                movies and describe a little about each movie.I am looking
                forward to add more functionality to it if there is suggestion
              </p>
              <p className="text-[#666666] text-sm mb-[21px]">
                Tech stack : React ,Tailwind Css
              </p>
              <div className="flex justify-center gap-[48px] items-center mb-2">
                <a
                  href="https://omoola-movie-search.netlify.app/"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <CiLink />
                </a>
                <a
                  href="https://github.com/Omo-ola/React-movie-search"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <IoCodeSlashOutline />
                </a>
              </div>
            </div>
          </article>
          <article className="items-center bg-white shadow-xl rounded-b-lg">
            <div className="h-[240px] pb-[17px]">
              <img
                src="/images/Todo.PNG"
                alt="Image of website"
                className="w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="px-[18px] bg-white rounded-b-lg">
              <h2 className="text-xl text-[#000000] font-bold mb-[17px]">
                A Todo list
              </h2>
              <p className="text-base mb-[12px]">
                A project that work as a simple to do App,This project combines
                simplicity with functionality, offering a seamless user
                experience enhanced by robust local storage capabilities
              </p>
              <p className="text-[#666666] text-sm mb-[21px]">
                Tech stack : HTML, CSS , JavaScript
              </p>
              <div className="flex justify-center gap-x-[48px] items-center mb-2">
                <a
                  href="https://to-dolist-psi.vercel.app/"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <CiLink />
                </a>
                <a
                  href="https://github.com/Omo-ola/To-dolist"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <IoCodeSlashOutline />
                </a>
              </div>
            </div>
          </article>
          <article className="items-center bg-white shadow-xl rounded-b-lg">
            <div className="h-[240px] pb-[17px]">
              <img
                src="/images/pig-game.PNG"
                alt="Image of website"
                className="w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="px-[18px] bg-white rounded-b-lg">
              <h2 className="text-xl text-[#000000] font-bold mb-[17px]">
                Pig Game
              </h2>
              <p className="text-base mb-[12px]">
                The project design come from Jonas.io javascript course, I
                implement the functionality of the project.It involve 2 users
                ,where each user can roll a dice and add score to user scores.
              </p>
              <p className="text-[#666666] text-sm mb-[21px]">
                Tech stack : HTML,CSS , JavaScript
              </p>
              <div className="flex justify-center gap-x-[48px] items-center mb-2">
                <a
                  href="https://pig-game-one-beta.vercel.app/"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <CiLink />
                </a>
                <a
                  href="https://github.com/Omo-ola/Pig-Game"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <IoCodeSlashOutline />
                </a>
              </div>
            </div>
          </article>
          <article className="items-center bg-white shadow-xl rounded-b-lg">
            <div className="h-[240px] pb-[17px]">
              <img
                src="/images/mentor-1.JPG"
                alt="Image of website"
                className="w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="px-[18px] bg-white rounded-b-lg">
              <h2 className="text-xl text-[#000000] font-bold mb-[17px]">
                Rest Country API
              </h2>
              <p className="text-base mb-[12px]">
                Embark on the challenge with my innovative solution for Frontend
                Mentor! I`&apos;ve crafted a web app that meets the requirements
                and expectations by fetching data to provide users with a
                comprehensive experience
              </p>
              <p className="text-[#666666] text-sm mb-[21px]">
                Tech stack : React, Tailwind
              </p>
              <div className="flex justify-center gap-x-[48px] items-center mb-2">
                <a
                  href="https://frontend-mentor-task-country.vercel.app/"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <CiLink />
                </a>
                <a
                  href="https://github.com/Omo-ola/frontend-mentor-task-country"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <IoCodeSlashOutline />
                </a>
              </div>
            </div>
          </article>
          <article className="items-center bg-white shadow-xl rounded-b-lg">
            <div className="h-[240px] pb-[17px]">
              <img
                src="/images/Edukate.PNG"
                alt="Image of website"
                className="w-full h-full rounded-t-lg object-cover"
              />
            </div>
            <div className="px-[18px] bg-white rounded-b-lg flex flex-col justify-between">
              <h2 className="text-xl text-[#000000] font-bold mb-[17px]">
                EduKate
              </h2>
              <p className="text-base mb-[12px]">
                A responsive static page that can be used for Educational
                purposes, the static website boasts a clean and modern design,
                meticulously crafted to provide an optimal user experience.
              </p>
              <p className="text-[#666666] text-sm mb-[21px]">
                Tech stack : HTML ,CSS
              </p>
              <div className="flex justify-center gap-x-[48px] items-center mb-2">
                <a
                  href="https://edu-kate.vercel.app/"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <CiLink />
                </a>
                <a
                  href="https://github.com/Omo-ola/EduKate"
                  target="_blank"
                  className="hover:text-blue-500 font-bold text-2xl"
                  rel="noopener noreferrer"
                >
                  <IoCodeSlashOutline />
                </a>
              </div>
            </div>
          </article>
        </main>
      </div>

      {/* footer section */}

      <footer className="footer section-hidden px-4">
        <section className="border-b-2 pb-10 px-4 md:px-0" id="contact">
          <div className="flex-none md:flex flex-wrap justify-between gap-4">
            <div className="content basis-[30%] flex flex-col justify-center mb-2 md:mb-0">
              <h1 className="text-5xl font-bold capitalize mb-4">contact</h1>
              <p className="text-xl">
                I would love to hear about your project and how I could
                help.Please fill in the form, and I will get back to you as soon
                as possible
              </p>
            </div>
            <div className="form-container basis-[60%]">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-b-2"
                />
                <input
                  type="email"
                  name=""
                  id=""
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="border-b-2"
                />
                <textarea
                  name="message"
                  id="message"
                  cols="20"
                  rows="5"
                  placeholder="Message"
                  className="border-b-2"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                  className="bg-blue-700 w-[100%] hover:bg-blue-800 py-2 px-4 text-white text-lg rounded-md block m-auto"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="flex justify-between mt-6 mb-8 ">
          <div className="flex justify-center items-center">
            <a href="https://www.linkedin.com/in/ayishat-odekunle-a7146527a/"></a>
            <a href="https://x.com/Doa_debbie"></a>
            <a href="#"></a>
          </div>
          <div className="text-sm">
            &copy; copyright 2023 by{" "}
            <span className="bg-gradient-to-r from-blue-500 to-red-300 bg-clip-text text-transparent">
              omoola
            </span>{" "}
            | all right reserved
          </div>
        </section>
      </footer>
    </section>
  );
}

export default Body;
