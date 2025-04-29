"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex } from "@radix-ui/themes";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import AudioPlayer from "@/components/footer/AudioPlayer";

function ProjectDashboardPage() {
  const users = [
    { name: "name1", image: "file.svg" },
    { name: "name2", image: "file.svg" },
    { name: "name3", image: "file.svg" },
  ];
  const comments = [
    { name: "name1", comment: "Hi" },
    { name: "name2", comment: "Hello" },
    { name: "name3", comment: "Hey" },
  ];
  const router = useRouter();

  return (
    <>
      <Header />
      <Flex direction="row" gap="2" className="h-full">
        <Sidebar />

        <Box className="bg-zinc-900 w-full h-full p-4 rounded-lg overflow-hidden">
          <section className="flex h-1/3">
            <img className="h-full object-cover rounded-full" src="https://images.unsplash.com/photo-1697464455500-35fbe5638ec8" alt="" />
            <div className="flex flex-col justify-end h-5/6 gap-2 ml-2">
              <h1 className="text-4xl">Project name 1</h1>
              <p>Description</p>
              <ul className="flex gap-2">
                {users.map((user) => (
                  <li key={user.name} className="flex gap-2">
                    <div className="h-4 w-4">
                      <img src={user.image} alt="" />
                    </div>
                    <p>{user.name}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          <section className="m-4 h-16 w-1/4 border-dashed border-2"></section>
          <section className="flex h-full">
            <ul className="flex gap-2 flex-col w-9/12">
              {users.map((user) => (
                <li key={user.name} className="flex gap-2">
                  <div className="bg-white h-full rounded-2xl w-1/12">
                    <img className=" w-32 object-cover" src={user.image} alt="" />
                  </div>
                  <div className="w-5/12">
                    <h2>{user.name}</h2>
                    <p>Desc</p>
                  </div>
                  <div className="w-2/12">
                    <p>info1</p>
                  </div>
                  <div className="w-2/12">
                    <p>info2</p>
                  </div>
                  <div className="w-2/12">
                    <p>info3</p>
                  </div>
                  <div>
                    <img src="message-square-text.svg" alt="" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-2 border-white rounded-lg p-2 mx-2 flex flex-col bg-gray-900 w-3/12">
              <p className="text-center">comments</p>
              <ul className="w-full h-3/6">
                {comments ? (
                  comments.map((comments, index) => (
                    <li key={index} className="flex gap-2">
                      <p>{comments.name}:</p>
                      <p> {comments.comment}</p>
                    </li>
                  ))
                ) : (
                  <p>No comments</p>
                )}
              </ul>
              <input className="" type="text" />
            </div>
          </section>
        </Box>
      </Flex>
      <footer>
        <AudioPlayer />
      </footer>
    </>
  );
}

export default ProjectDashboardPage;
