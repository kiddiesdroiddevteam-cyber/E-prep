import AdminSidebar from '@/components/AdminSidebar'
import BookOpenIcon from '@/components/icons/BookOpenIcon'
import FormGroup from '@mui/material/FormGroup'
import React from 'react'

const AdminPage = () => {
  return (
    <div className=" min-h-[100vh] w-[100vw] bg-white">
      <AdminSidebar screen={"dashboard"} />
      <div className="max-sm:pt-[90px] mx-auto lg:px-4 lg:pl-[19vw] py-[2vh]">
        <h1 className='text-[#20232D] text-[24px] font-[500]'>Dashboard Overview</h1>
        <p className=' text-[#868C98] text-[16px]'>Welcome back! Here's what's happening with your exam platform.</p>

        <div className=' mt-[8vh] mb-[4vh] w-full grid grid-cols-4'>
          <div className=' bg-white h-[97px] border border-[#E2E4E9] rounded-md mr-[12px] flex items-center px-[5%] py-[2.5%]'>
            <div className=' h-[36px] w-[36px] bg-[#EBF2FF] rounded-full mr-[20px] flex items-center justify-center text-[#0055FF]'>
              <BookOpenIcon />
            </div>
            <div>
              <p className=' text-[#868C98] text-[14px]'>Total Questions</p>
              <h1 className=' text-[24px] text-black font-[500]'>7,320</h1>
            </div>
          </div>
          <div className=' bg-white h-[97px] border border-[#E2E4E9] rounded-md mx-[12px] flex items-center px-[5%] py-[2.5%]'>
            <div className=' h-[36px] w-[36px] bg-[#EFFAF6] rounded-full mr-[20px] flex items-center justify-center text-[#38C793]'>
              <BookOpenIcon />
            </div>
            <div>
              <p className=' text-[#868C98] text-[14px]'>Active Students</p>
              <h1 className=' text-[24px] text-black font-[500]'>356</h1>
            </div>
          </div>
          <div className=' bg-white h-[97px] border border-[#E2E4E9] rounded-md mx-[12px] flex items-center px-[5%] py-[2.5%]'>
            <div className=' h-[36px] w-[36px] bg-[#FEF7EC] rounded-full mr-[20px] flex items-center justify-center text-[#F2AE40]'>
              <BookOpenIcon />
            </div>
            <div>
              <p className=' text-[#868C98] text-[14px]'>Practice Tests</p>
              <h1 className=' text-[24px] text-black font-[500]'>3,232</h1>
            </div>
          </div>
          <div className=' bg-white h-[97px] border border-[#E2E4E9] rounded-md ml-[12px] flex items-center px-[5%] py-[2.5%]'>
            <div className=' h-[36px] w-[36px] bg-[#FEF3EB] rounded-full mr-[20px] flex items-center justify-center text-[#F17B2C]'>
              <BookOpenIcon />
            </div>
            <div>
              <p className=' text-[#868C98] text-[14px]'>AI Generation</p>
              <h1 className=' text-[24px] text-black font-[500]'>1,252</h1>
            </div>
          </div>
        </div>

        <div className=' w-full flex items-center justify-between h-[400px] mb-[4vh]'>
          <div className=' w-[49%] rounded-xl h-full border border-[#E2E4E9] bg-white'></div>
          <div className=' w-[49%] rounded-xl h-full border border-[#E2E4E9] bg-white'></div>
        </div>

        <div className=' w-full h-[65vh] bg-white rounded-xl border border-[#E2E4E9] p-[1.5%] overflow-y-hidden'>
          <h1 className=' text-[18px] text-[#20232D] font-[500]'>Recent Activities</h1>
          <div className=' w-full h-full overflow-y-scroll'>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div><div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>
            <div className=' h-[53px] w-full border-b border-b-[#E2E4E9] my-[10px] flex items-center justify-between py-2'>
              <div>
                <h1 className=' text-[#0A0D14] text-16px]'>Question Upload</h1>
                <p className=' text-[#525866] font-thin text-[14px]'>Mathematics . JAMB</p>
              </div>
              <h1 className=' text-[#525866] font-thin text-[14px]'>2/23/2026 . 2:27 PM</h1>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage