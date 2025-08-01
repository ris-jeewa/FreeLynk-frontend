import React from 'react';

const TestCheckBox = () => {
    return (
        <div className=' flex-col justify-center items-center h-screen m-40 bg-orange-500'>
            <h2>Test CheckBox</h2>
            <label className="flex items-center transistion duration-200 gap-2">
                <input type="checkbox" value="orange" />
                <div className="w-[25px] h-[25px] rounded-md bg-white ">
                    <div className="w-[25px] h-[15px] relative -rotate-45 left-[3px]">
                        <div className="w-[5px] h-[100%] bg-purple-500 absolute rounded-full"></div>
                        <div className="w-[100%] h-[5px] bottom-0 bg-purple-500 absolute rounded-full"></div>
                    </div>
                </div>
                
                <div className='ml-[15px] text-[25px]'>Orange</div>
            </label>
        </div>
    )
};

export default TestCheckBox;