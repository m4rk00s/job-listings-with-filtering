import React, { useReducer, useState } from "react";
import Account from "../images/account.svg";
import BgHeaderDesktop from "../images/bg-header-desktop.svg";
import BgHeaderMobile from "../images/bg-header-mobile.svg";
import EyecamCo from "../images/eyecam-co.svg";
import FaceIt from "../images/faceit.svg";
import IconRemove from "../images/icon-remove.svg";
import Insure from "../images/insure.svg";
import LoopStudios from "../images/loop-studios.svg";
import Manage from "../images/manage.svg";
import MyHome from "../images/myhome.svg";
import PhotoSnap from "../images/photosnap.svg";
import Shortly from "../images/shortly.svg";
import TheAirFilterCompany from "../images/the-air-filter-company.svg";
import initialData from "../data.json";

type Role = "Frontend" | "Backend" | "Fullstack";

type Level = "Junior" | "Midweight" | "Senior";

type Language = "Python" | "Ruby" | "JavaScript" | "HTML" | "CSS";

type Tool = "React" | "Sass" | "Vue" | "Django" | "RoR";

type Action =
  | { type: "add-filter"; tag: Role | Level | Language | Tool }
  | { type: "clear-filter"; tag: Role | Level | Language | Tool }
  | { type: "clear-all-filters" };

interface JobPost {
  id: number;
  company: string;
  logo: string;
  new: boolean;
  featured: boolean;
  position: string;
  role: Role;
  level: Level;
  postedAt: string;
  contract: string;
  location: string;
  languages: Language[];
  tools: Tool[];
}

interface State {
  posts: JobPost[];
  filters: (Role | Level | Language | Tool)[];
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData as JobPost[], init);

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "add-filter":
        return {
          ...state,
          filters: state.filters.concat([action.tag]),
        };
      case "clear-filter":
        return {
          ...state,
          filters: state.filters.filter((tag) => tag !== action.tag),
        };
      case "clear-all-filters": {
        return {
          ...state,
          filters: [],
        };
      }
    }
  }

  function init(data: JobPost[]): State {
    return {
      posts: data,
      filters: [],
    };
  }

  function companyLogo(data: JobPost): string {
    switch (data.company) {
      case "Photosnap":
        return PhotoSnap;
      case "Manage":
        return Manage;
      case "Account":
        return Account;
      case "MyHome":
        return MyHome;
      case "Loop Studios":
        return LoopStudios;
      case "FaceIt":
        return FaceIt;
      case "Shortly":
        return Shortly;
      case "Insure":
        return Insure;
      case "Eyecam Co.":
        return EyecamCo;
      case "The Air Filter Company":
        return TheAirFilterCompany;
      default:
        return "";
    }
  }

  return (
    <div className="h-full bg-[#EFFAFA]">
      <div className="bg-[#5CA5A5]">
        <img src={BgHeaderMobile} alt="" />
      </div>

      <div className="px-6 py-8 flex flex-col gap-4">
        {state.posts.map((post) => {
          return (
            <div
              key={post.id}
              className={[
                "bg-white rounded-md shadow-card p-6 mt-6",
                post.new ? "border-l-[5px] border-l-[#5CA5A5]" : "",
              ].join(" ")}
            >
              <div>
                <img className="h-12 -mt-12" src={companyLogo(post)} alt="" />
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline text-sm font-bold mt-4">
                    <div className="text-[#5CA5A5]">{post.company}</div>
                    <div className="text-white text-xs flex align-baseline gap-2 ml-4">
                      {post.new ? (
                        <span className="bg-[#5CA5A5] rounded-full px-2 pt-2 pb-1 flex items-center justify-center">
                          NEW!
                        </span>
                      ) : (
                        <></>
                      )}
                      {post.featured ? (
                        <span className="bg-[#2B3939] rounded-full px-2 pt-2 pb-1 flex items-center justify-center">
                          FEATURED
                        </span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <div className="text-[#2B3939] font-bold">
                    {post.position}
                  </div>
                  <div className="text-sm text-[#7C8F8F]">
                    {post.postedAt}{" "}
                    <span className="h-1 w-1 bg-[#B7C4C4] inline-block mb-[0.15rem] mx-1 rounded-full"></span>{" "}
                    {post.contract}{" "}
                    <span className="h-1 w-1 bg-[#B7C4C4] inline-block mb-[0.15rem] mx-1 rounded-full"></span>{" "}
                    {post.location}
                  </div>
                </div>
                <hr className="my-4 border-[#B7C4C4]" />
                <div className="flex flex-wrap gap-4 text-sm text-[#5CA5A5] font-bold">
                  {[post.role, post.level, ...post.languages, ...post.tools]
                    .sort()
                    .map((tag, index) => {
                      return (
                        <div
                          key={index}
                          className="px-2 flex items-center justify-center h-8 bg-[#5CA5A5] bg-opacity-10 rounded-md"
                        >
                          {tag}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
