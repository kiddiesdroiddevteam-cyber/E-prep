import BookOpenIcon from '@/components/icons/BookOpenIcon';
import React, { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import SubjectsScroll from '@/components/SubjectsScroll';


const LandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 4000)
    })
    return (
        <div>
            {
                isLoading ?
                    (
                        <div className=' h-[100vh] w-full flex items-center justify-center bg-[#02000D]'>
                            <div className=' w-fit'>
                                <h1 className=' font-bold text-3xl md:text-7xl text-[#0400FF]'>iWanPass</h1>
                                <div className=' underlineanimation h-[3px] bg-[#0400FF]'></div>
                            </div>
                        </div>
                    ) : (
                        <div className='h-[100vh] w-[100vw] bg-[#02000D] overflow-y-scroll text-black'>
                            <div className='fixed z-[10] h-[80px] w-[100vw] flex items-center justify-start px-[2.5%]'>
                                <h1 className=' text-[#0400FF] font-extrabold text-[22px] italic flex items-center justify-center'><img src="../assets/logo.png" alt="" className=' h-[20px] mr-[10px]' /> iWanPass</h1>
                            </div>

                            <div className=' w-[100vw] min-h-[100vh] bg-gradient-to-b to-transparent via-transparent from-[#0055FF]/10 bg-opacity-0 flex flex-col items-center justify-center px-[2.5%]'>
                                <div className=' w-full text-white text-center mb-[20px] mt-[30px]'>
                                    <h1 className=' text-[40px] lg:text-[64px] text-center'>Study Smarter <br /> with AI-Powered Practice</h1>
                                    <p className=' text-[18px] lg:text-[24px] mb-[20px]'>Get past questions, AI-generated tests, and personalized study <br /> recommendations—all in one platform</p>
                                    <Link
                                        className=' w-[235px] h-[66px] mx-auto flex items-center justify-center bg-[#0400FF] rounded-xl'
                                        to={"/dashboard"}
                                    >
                                        Get Started
                                    </Link>
                                </div>

                                <div className=' min-h-[40vh] w-[95%] lg:w-[70%] bg-[#CDE7FF] rounded-xl'>
                                    <video
                                        src="/test-vid.mp4"
                                        controls
                                        loop
                                        muted
                                        className="w-full h-auto rounded-xl border border-[#0055FF]"
                                    />
                                </div>
                            </div>

                            {/* About */}
                            {/* <div className=' w-[100vw] text-white min-h-[100vh] bg-gradient-to-b to-transparent via-[#0055FF]/10 from-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh] max-sm:pb-[30px]'>
                                <div className=' w-full flex flex-col items-center justify-center mb-[30px]'>
                                    <h1 className=' text-white bg-[#0055FF] px-2 py-1 rounded-full mb-[10px] text-center'>About</h1>
                                    <h1 className=' max-sm:text-[30px] font-semibold text-[48px] text-white mb-[5px] text-center'>About iWanPass</h1>
                                    <p className="text-center">Everything you need to know about iWanPass</p>
                                </div>
                                <div className=' w-[100vw] h-[60vh]  flex flex-col lg:flex-row items-center justify-between px-[2.5%]'>
                                    <div className=' max-sm:w-[95%] mb-[10px] w-[45%]'>
                                        <p className=' text-[18px] text-[#fff] text-justify font-thin'>
                                            iWanPass is a study platform designed to help students prepare more effectively for exams like WAEC, JAMB, and NECO. It brings essential study resources into one place by combining past questions, AI-generated practice tests, and a note-to-quiz feature that converts uploaded notes into personalized exams. By organizing materials and offering targeted practice, iWanPass helps students revise specific topics and get ready for their final exams in a smarter, more efficient way.
                                        </p>
                                    </div>

                                    <div className=' max-sm:w-[95%] mb-[10px] w-[45%] h-full flex items-center justify-center'>
                                        <video
                                            src="/test-vid.mp4"
                                            controls
                                            loop
                                            muted
                                            className="w-full h-auto rounded-xl border border-[#0055FF]"
                                        />
                                    </div>
                                </div>
                            </div> */}

                            {/* Features to boost your study */}
                            <div className=' w-[100vw] min-h-[100vh] bg-gradient-to-b from-transparent via-[#0055FF]/10 to-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div className=' w-full flex flex-col items-center justify-center mb-[10px]'>
                                    <h1 className=' text-white bg-[#0055FF] px-2 py-1 rounded-full mb-[10px]'>About</h1>
                                    <h1 className=' max-sm:text-[30px] font-semibold text-[48px] text-white mb-[5px] text-center'>Multiple Features To Boost Your Study</h1>
                                    <p className=' text-white className="text-center"'>Everything you need to practice and prepare for your exam</p>
                                </div>
                                <div className=' w-[100vw] min-h-[60vh] px-[5%] flex flex-col items-center justify-center pt-[10vh]'>


                                    <div className=' w-full flex items-center justify-between flex-col lg:flex-row'>
                                        <div className=' p-[30px] rounded-2xl lg:w-[48%] text-white bg-[#35333D]/50 mb-[20px] gridBg'>
                                            <img src="/pq-vec.png" alt="" className=' mb-[10px] block' />
                                            <h1 className=' mb-[5px] mt-[10px]'>Access Past Questions (WAEC, JAMB, NECO)</h1>
                                            <p>Get well-organized, updated, past questions for your external examinations</p>
                                        </div>

                                        <div className=' p-[30px] rounded-2xl lg:w-[48%] text-white bg-[#35333D]/50 mb-[20px] gridBg'>
                                            <img src="/pq-vec2.png" alt="" className=' mb-[10px] block' />
                                            <h1 className=' mb-[5px] mt-[10px]'>Instant AI-Generated Questions</h1>
                                            <p>Get AI generated questions for any subject or topic for instant practice</p>
                                        </div>
                                    </div>

                                    <div className=' w-full flex items-center justify-between flex-col lg:flex-row'>
                                        <div className=' p-[30px] rounded-2xl lg:w-[48%] text-white bg-[#35333D]/50 mb-[20px] gridBg'>
                                            <img src="/pq-vec3.png" alt="" className=' mb-[10px] block' />
                                            <h1 className=' mb-[5px] mt-[10px]'>Smart Performance Insights</h1>
                                            <p>Track and visualize your strengths, weaknesses, and progress automatically.</p>
                                        </div>

                                        <div className=' p-[30px] rounded-2xl lg:w-[48%] text-white bg-[#35333D]/50 mb-[20px] gridBg'>
                                            <img src="/pq-vec4.png" alt="" className=' mb-[10px] block' />
                                            <h1 className=' mb-[5px] mt-[10px]'>Upload note</h1>
                                            <p>Upload your note to generate questions instantly</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Get Startes in three simple steps */}
                            <div className=' w-[100vw] text-white min-h-[100vh] bg-gradient-to-b to-transparent via-[#0055FF]/10 from-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div className=' w-full flex flex-col items-center justify-center mb-[10px]'>
                                    <h1 className=' text-white bg-[#0055FF] px-2 py-1 rounded-full mb-[10px]'>How It Works</h1>
                                    <h1 className=' max-sm:text-[30px] font-semibold text-[48px] text-white mb-[5px] text-center'>Get Started in Three Simple Steps</h1>
                                    <p className="text-center">Three steps to show how to use IwanPass</p>
                                </div>
                                <div className=' w-[95%] flex max-sm:flex-col items-center justify-center mb-[10px]'>
                                    <div className=' gridBg bg-[#35333D]/50 flex flex-col items-start justify-between px-[30px] py-[20px] rounded-2xl mx-[10px] h-fit max-sm:w-[95%] mb-[10px] w-[33%] rounded-2xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M1.25 2A.75.75 0 0 1 2 1.25h20a.75.75 0 0 1 0 1.5h-1.25v7.808c0 1.483 0 2.676-.133 3.614c-.138.975-.434 1.784-1.105 2.42c-.666.632-1.503.904-2.512 1.033c-.981.125-2.233.125-3.804.125h-.446v2.787l1.585.792a.75.75 0 1 1-.67 1.342L12 21.839l-1.665.832a.75.75 0 1 1-.67-1.342l1.585-.793V17.75h-.446c-1.571 0-2.823 0-3.804-.125c-1.01-.129-1.846-.401-2.512-1.033c-.671-.636-.967-1.445-1.105-2.42c-.133-.938-.133-2.131-.133-3.614V2.75H2A.75.75 0 0 1 1.25 2m3.5.75v7.75c0 1.554.002 2.64.118 3.46c.113.795.32 1.228.652 1.544c.338.32.812.524 1.67.633c.875.112 2.03.113 3.667.113h2.286c1.636 0 2.792-.001 3.667-.113c.858-.11 1.332-.313 1.67-.633c.332-.316.54-.749.652-1.543c.116-.82.118-1.907.118-3.461V2.75zm10.78 5.22a.75.75 0 0 1 0 1.06l-1.293 1.293l-.024.025a5 5 0 0 1-.452.416a1.24 1.24 0 0 1-.761.279a1.24 1.24 0 0 1-.761-.279a5 5 0 0 1-.452-.416l-.024-.025l-.586-.586L11 9.562l-.177.175L9.53 11.03a.75.75 0 1 1-1.06-1.06l1.293-1.293l.024-.025c.145-.145.302-.302.452-.416A1.24 1.24 0 0 1 11 7.957c.334 0 .585.145.761.279c.15.114.307.271.452.416l.024.025l.586.586l.177.175l.177-.175L14.47 7.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd" /></svg>

                                        <h1 className=' mt-[20px] text-[16px]'>Choose or Upload</h1>
                                        <p className=' text-[16px]'>Select from past questions or upload your own notes to generate questions.</p>
                                    </div>

                                    <div className=' gridBg bg-[#35333D]/50 flex flex-col items-start justify-between px-[30px] py-[20px] rounded-2xl mx-[10px] h-fit max-sm:w-[95%] mb-[10px] w-[33%] rounded-2xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M1.25 2A.75.75 0 0 1 2 1.25h20a.75.75 0 0 1 0 1.5h-1.25v7.808c0 1.483 0 2.676-.133 3.614c-.138.975-.434 1.784-1.105 2.42c-.666.632-1.503.904-2.512 1.033c-.981.125-2.233.125-3.804.125h-.446v2.787l1.585.792a.75.75 0 1 1-.67 1.342L12 21.839l-1.665.832a.75.75 0 1 1-.67-1.342l1.585-.793V17.75h-.446c-1.571 0-2.823 0-3.804-.125c-1.01-.129-1.846-.401-2.512-1.033c-.671-.636-.967-1.445-1.105-2.42c-.133-.938-.133-2.131-.133-3.614V2.75H2A.75.75 0 0 1 1.25 2m3.5.75v7.75c0 1.554.002 2.64.118 3.46c.113.795.32 1.228.652 1.544c.338.32.812.524 1.67.633c.875.112 2.03.113 3.667.113h2.286c1.636 0 2.792-.001 3.667-.113c.858-.11 1.332-.313 1.67-.633c.332-.316.54-.749.652-1.543c.116-.82.118-1.907.118-3.461V2.75zm10.78 5.22a.75.75 0 0 1 0 1.06l-1.293 1.293l-.024.025a5 5 0 0 1-.452.416a1.24 1.24 0 0 1-.761.279a1.24 1.24 0 0 1-.761-.279a5 5 0 0 1-.452-.416l-.024-.025l-.586-.586L11 9.562l-.177.175L9.53 11.03a.75.75 0 1 1-1.06-1.06l1.293-1.293l.024-.025c.145-.145.302-.302.452-.416A1.24 1.24 0 0 1 11 7.957c.334 0 .585.145.761.279c.15.114.307.271.452.416l.024.025l.586.586l.177.175l.177-.175L14.47 7.97a.75.75 0 0 1 1.06 0" clip-rule="evenodd" /></svg>

                                        <h1 className=' mt-[20px] text-[16px]'>Let AI Generate</h1>
                                        <p className=' text-[16px]'>AI creates multiple-choice, theory, or short-answer questions instantly.</p>
                                    </div>

                                    <div className=' gridBg bg-[#35333D]/50 flex flex-col items-start justify-between px-[30px] py-[20px] rounded-2xl mx-[10px] h-fit max-sm:w-[95%] mb-[10px] w-[33%] rounded-2xl'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="m23.99 5.489l-.1-1.67a6 6 0 0 0-.19-.919a2.1 2.1 0 0 0-.38-.72a2.1 2.1 0 0 0-1-.46a24 24 0 0 0-2.998-.36c-3.249-.22-7.627-.19-8.646-.17c-1.49.06-2.93.15-4.379.26a84 84 0 0 0-4.358.45a.33.33 0 0 0 .06.65c1.47-.12 2.899-.21 4.338-.27s2.87-.07 4.339-.06c.89 0 4.328.12 7.326.31c1.54.1 3 .21 3.839.37c.3 0 .7 0 .64.16q.09.15.13.32c.06.22.09.44.13.64l.13 1.489l.07 2.169l.05 3.718v2.44c0 1.069-.12 2.129-.19 3.198a.36.36 0 0 0-.36-.29l-9.317.16c-1.639.05-3.288.17-4.927.2h-2.07l-3.818-.1a6 6 0 0 1-.71-.08c-.11 0-.23-.05-.29-.14a1 1 0 0 1-.1-.54c0-.46.05-1 .05-1.289h.12c2.55 0 5.118 0 7.707-.06c1.27 0 2.55 0 3.829-.07s2.559-.07 3.838-.08c1.28-.01 2.559 0 3.838 0a.37.37 0 0 0 .39-.35a.36.36 0 0 0-.35-.39a95 95 0 0 0-6.747-.41h-2.909c-.97 0-1.939 0-2.898.1c-2.26.13-4.498.37-6.728.59h-.09V8.888a32 32 0 0 1 .12-3.579a9.6 9.6 0 0 1 .48-2.299a.33.33 0 0 0-.18-.42a.34.34 0 0 0-.43.19A10.7 10.7 0 0 0 .63 5.22a34 34 0 0 0-.25 3.708l-.29 5.937a15 15 0 0 0-.09 1.61a2 2 0 0 0 .27.929c.148.232.36.416.61.53a4 4 0 0 0 1.3.26c.389 0 .789.07 1.189.08c.89 0 1.779 0 2.678.06c.9.06 1.92 0 2.88 0l.899-.07l-1.23 2.658a7 7 0 0 0-.45.95a.8.8 0 0 0 0 .5a.63.63 0 0 0 .4.36q.213.05.43.08q.3.023.6 0q.422-.018.84-.08q1.488-.27 2.998-.36c2.29-.13 2.77.16 2.21-1.94c-.07-.26-.13-.51-.22-.759c-.09-.25-.19-.5-.3-.73c-.2-.38-.42-.72-.64-1.06l7.997-.419a.35.35 0 0 0 .32-.27v.32a.38.38 0 0 0 .34.4a.38.38 0 0 0 .4-.35c.11-1.24.25-2.459.35-3.698c.059-.83.109-1.66.129-2.5V5.49zm-9.936 14.144c.12.39.27.76.42 1.14s.22.55.34.82q-.964-.15-1.94-.18a23 23 0 0 0-2.608.11h-.74q.077-.112.14-.23c.24-.81.44-1.62.69-2.42c.08-.25.17-.5.26-.74c.85-.07 1.699-.15 2.548-.2h.45c.14.57.26 1.13.44 1.7" /><path d="M6.687 8.228c-.13.19-.26.37-.37.57s-.38.68-.57 1a1.6 1.6 0 0 0-.41-.12a1.85 1.85 0 0 0-.929.16a1.65 1.65 0 0 0-1 1.109c-.16.73.15 1.609 1.45 1.559c1.62.14 1.88-.75 1.94-1.21a1.4 1.4 0 0 0-.39-1.089q.54-.405.999-.9q.354-.432.63-.92c.28-.48.5-.999.76-1.469a.39.39 0 0 0 0-.33c.236.056.482.056.719 0q.406.544.91 1q.378.315.8.57c.25.16.51.31.759.45a1.6 1.6 0 0 0-.5.77c-.15.729.16 1.609 1.45 1.559c1.619.14 1.879-.75 1.939-1.21a1.27 1.27 0 0 0-.13-.69c.32-.17.65-.34.95-.54c.368-.246.703-.539.999-.869q.543-.578 1-1.23a.35.35 0 0 0 .1-.25q.135.009.27 0c1.629.14 1.879-.749 1.939-1.209a1.53 1.53 0 0 0-1.49-1.63a2.2 2.2 0 0 0-.94.16a1.74 1.74 0 0 0-.999 1.12a1.22 1.22 0 0 0 .65 1.42c-.4.3-.82.55-1.22.84s-.56.42-.81.65a10 10 0 0 0-.879.999a1.9 1.9 0 0 0-.84-.32a2 2 0 0 0-.55.1a9 9 0 0 0-.859-.95a5.5 5.5 0 0 0-.98-.75c-.27-.16-.54-.3-.8-.44a1.4 1.4 0 0 0 .28-.679a1.52 1.52 0 0 0-1.489-1.62a2 2 0 0 0-.93.17a1.65 1.65 0 0 0-.999 1.12a1.16 1.16 0 0 0 .94 1.48c-.34.36-.69.71-1 1.099c-.09.16-.26.3-.4.52m-1.45 3.508a.4.4 0 0 0-.329.13c-.35-.08-.51-.25-.51-.45s.12-.19.22-.28a.87.87 0 0 1 .66-.2c.37 0 .6.24.52.47a.52.52 0 0 1-.56.33M17.924 4.87a.85.85 0 0 1 .65-.19c.37 0 .599.23.519.47a.51.51 0 0 1-.56.32a.35.35 0 0 0-.32.14c-.36-.08-.52-.25-.52-.45s.12-.15.23-.29m-3.999 4.998a.52.52 0 0 1-.56.33a.32.32 0 0 0-.32.13c-.36-.08-.52-.25-.52-.45s.13-.19.23-.29a.9.9 0 0 1 .65-.19c.38.02.59.27.52.5zM8.357 5.28a.86.86 0 0 1 .64-.19c.37 0 .589.23.519.47a.53.53 0 0 1-.52.32a.4.4 0 0 0-.35.13c-.35-.08-.52-.24-.51-.44s.12-.2.22-.29" /></g></svg>

                                        <h1 className=' mt-[20px] text-[16px]'>Practice & Review</h1>
                                        <p className=' text-[16px]'>Take timed tests and get detailed explanations and scoring</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Preview */}
                            <div className=' w-[100vw] text-white min-h-[100vh] bg-gradient-to-b from-transparent via-[#0055FF]/10 to-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div className=' w-full flex flex-col items-center justify-center mb-[20px]'>
                                    <h1 className=' text-white bg-[#0055FF] px-2 py-1 rounded-full mb-[10px]'>Dashboard</h1>
                                    <h1 className=' max-sm:text-[30px] font-semibold text-[48px] text-white mb-[5px] text-center'>Your Personal Study Hub</h1>
                                    <p className="text-center">Track Progress, weak topics and past tests.</p>
                                </div>
                                <div>
                                    <img src="/preview.png" alt="" className=' block mt-[10px]' />
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className=' w-[100vw] text-white min-h-[100vh] bg-gradient-to-b to-transparent via-[#0055FF]/10 from-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div className=' w-full flex flex-col items-center justify-center mb-[25px]'>
                                    <h1 className=' text-white bg-[#0055FF] px-2 py-1 rounded-full mb-[10px]'>Benefits</h1>
                                    <h1 className=' max-sm:text-[30px] font-semibold text-[48px] text-white mb-[5px] text-center'>Benefits Of Using iWanPass</h1>
                                    <p className="text-center">Everything you need to practice and prepare for your exam</p>
                                </div>
                                <div className=' w-[90%] flex max-sm:flex-col items-center justify-center lg:mb-[10px]'>
                                    <div className=' bg-[#35333D]/50 flex items-center justify-between lg:max-w-fit px-[30px] py-[20px] rounded-2xl mx-[10px] mb-[10px] max-sm:w-[95%]'>
                                        <div className=' h-[60px] w-[60px] rounded-xl bg-red-500 flex items-center justify-center mr-[20px]'>
                                            <AutoStoriesOutlinedIcon />
                                        </div>

                                        <h1 className=' text-[16px]'>Instant Corrections</h1>
                                    </div>

                                    <div className=' bg-[#35333D]/50 flex items-center justify-between lg:max-w-fit px-[30px] py-[20px] rounded-2xl mx-[10px] mb-[10px] max-sm:w-[95%]'>
                                        <div className=' h-[60px] w-[60px] rounded-xl bg-[#0055FF] flex items-center justify-center mr-[20px]'>
                                            <AutoStoriesOutlinedIcon />
                                        </div>

                                        <h1 className=' text-[16px]'>Unlimited AI Tests</h1>
                                    </div>

                                    <div className=' bg-[#35333D]/50 flex items-center justify-between lg:max-w-fit px-[30px] py-[20px] rounded-2xl mx-[10px] mb-[10px] max-sm:w-[95%]'>
                                        <div className=' h-[60px] w-[60px] rounded-xl bg-green-500 flex items-center justify-center mr-[20px]'>
                                            <AutoStoriesOutlinedIcon />
                                        </div>

                                        <h1 className=' text-[16px]'>Past Question Library</h1>
                                    </div>
                                </div>
                                <div className=' w-[90%] flex items-center justify-center mb-[10px]'>
                                    <div className=' bg-[#35333D]/50 flex items-center justify-between lg:max-w-fit px-[30px] py-[20px] rounded-2xl mx-[10px] max-sm:w-[95%]'>
                                        <div className=' h-[60px] w-[60px] rounded-xl bg-amber-600 flex items-center justify-center mr-[20px]'>
                                            <AutoStoriesOutlinedIcon />
                                        </div>

                                        <h1 className=' text-[16px]'>Smart Analytics</h1>
                                    </div>

                                    {/* <div className=' bg-[#35333D]/50 flex items-center justify-between max-w-fit px-[30px] py-[20px] rounded-2xl mx-[10px]'>
                                        <div className=' h-[60px] w-[60px] rounded-xl bg-[#0055FF] flex items-center justify-center mr-[20px]'>
                                            <AutoStoriesOutlinedIcon />
                                        </div>

                                        <h1 className=' text-[16px]'>Performance analytics</h1>
                                    </div> */}
                                </div>
                            </div>

                            {/* Subjects You Can Study */}
                            <div className=' w-[100vw] text-white min-h-[100vh] bg-gradient-to-b from-transparent via-[#0055FF]/10 to-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div className=' w-full flex flex-col items-center justify-center mb-[10px]'>
                                    <h1 className=' text-white bg-[#0055FF] px-2 py-1 rounded-full mb-[10px]'>Our Subjects</h1>
                                    <h1 className=' max-sm:text-[30px] font-semibold text-[48px] text-white mb-[5px] text-center'>Subjects You Can Study</h1>
                                    <p className="text-center">Subjects From Waec, Neco, Jamb and more</p>
                                </div>
                                <div className=' w-[95%] h-[80vh] flex max-sm:flex-col items-center justify-between mb-[10px]'>
                                    <div className=' max-sm:w-[95%] w-[35%] h-full flex-col flex items-center justify-center text-[24px]'>
                                        <div>
                                            <h1>WAEC</h1>
                                            <h1>NECO</h1>
                                            <h1>JAMB</h1>
                                            <h1>Common Entrance</h1>
                                            <h1>And so much more...</h1>
                                        </div>
                                    </div>
                                    <div className=' max-sm:w-[100%] w-[70%] h-full flex items-center justify-center'>
                                        <div className=' w-[100%] h-[70%] bg-[#35333D]/50 rounded-2xl'>
                                            <SubjectsScroll />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Banner */}
                            <div className=' w-[100vw] text-white lg:min-h-[100vh] bg-gradient-to-b to-transparent via-[#0055FF]/10 from-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div>
                                    <img src="/banner.png" alt="" />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className=' w-[100vw] text-white h-fit bg-gradient-to-b from-transparent via-[#0055FF]/10 to-[#0055FF]/10 px-[5%] flex flex-col items-center justify-center pt-[10vh]'>
                                <div className=' w-[95%] h-[50vh] rounded-xl mx-auto bg-[#0055FF] flex flex-col items-center justify-center px-[2.5%] mb-[10vh]'>
                                    {/* <div className=' w-full'> */}
                                        <h1 className=' text-white text-[48px] mb-[20px]'>Start Studying Smarter Today</h1>
                                        <Link
                                            to={"/dashboard"}
                                            className=' text-[#000] bg-white px-[40px] py-[7px] rounded-full hover:bg-transparent hover:text-white duration-500'
                                        >
                                            Get Started For Free
                                        </Link>
                                    {/* </div> */}
                                    {/* <img src="/girl.png" alt="" className=' hidden h-full max-sm:hidden' /> */}
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default LandingPage