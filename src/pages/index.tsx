import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ShuffleIcon from "@/assets/svg/shuffle.svg";
import Mashong from "@/assets/svg/mashong.svg";
import LeftHand from "@/assets/svg/leftHand.svg";
import RightHand from "@/assets/svg/rightHand.svg";
import clsx from "clsx";
import { useTimer } from "use-timer";

const BG_COLOR_MAP = {
  Android: "bg-[#6AD79C]",
  "Product design": "bg-[#594AFF]",
  Spring: "bg-[#477C63]",
  iOS: "bg-[#F46B73]",
  Node: "bg-[#F16E51]",
  Web: "bg-[#3F9DE1]",
} as any;

const TEXT_COLOR_MAP = {
  Android: "text-[#6AD79C]",
  "Product design": "text-[#594AFF]",
  Spring: "text-[#477C63]",
  iOS: "text-[#F46B73]",
  Node: "text-[#F16E51]",
  Web: "text-[#3F9DE1]",
} as any;

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default function Home() {
  const [csv, setCsv] = useState<any[]>([]);
  const { time, start, pause, reset, status } = useTimer({
    initialTime: 10,
    endTime: 0,
    timerType: "DECREMENTAL",
  });

  const [currentItem, ...restItems] = csv;

  const processCSV = (str: string, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {} as any);

      return eachObject;
    });

    setCsv(newArray);
  };

  return (
    <div className="min-h-screen w-screen bg-black pb-[135px] text-white">
      <div className="mx-auto max-w-[940px] pt-[135px]">
        <div className="mb-10 max-w-[940px]">
          <input
            type="file"
            id="csv-file"
            className="hidden"
            onChange={(event) => {
              if (event.target.files?.length) {
                const fileReader = new FileReader();

                fileReader.onload = (event) => {
                  const text = event.target?.result;
                  processCSV(text as any);
                };

                fileReader.readAsText(event.target.files[0]);
              }
            }}
          />
          <label
            htmlFor="csv-file"
            className="inline-block cursor-pointer rounded-xl bg-[#2B2C31] py-4 px-6 text-[24px] font-normal leading-[29px]"
          >
            명단 선택
          </label>
        </div>
        <div className="relative z-10 h-[566px] rounded-2xl bg-[#2B2C31]">
          <Mashong
            className={clsx(
              "absolute right-0 top-[-129px]",
              status !== "STOPPED" && "animate-reveal"
            )}
            style={{
              animationPlayState:
                status === "PAUSED" || status === "STOPPED"
                  ? "paused"
                  : "running",
            }}
          />
          <LeftHand className="absolute right-[231px] top-[-14px] z-20" />
          <RightHand className="absolute right-[41px] top-[-14px] z-20" />
          <div className="relative z-10 h-16 rounded-2xl bg-[#2B2C31]" />
          <AnimatePresence>
            <div className="relative z-10 bg-[#2B2C31]">
              <motion.p
                className={clsx(
                  "block text-center text-5xl font-bold leading-[58px]",
                  currentItem && TEXT_COLOR_MAP[currentItem.platform],
                  !currentItem && "text-[#594AFF]"
                )}
                key={currentItem ? currentItem.platform : "Platform"}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}
              >
                {currentItem ? currentItem.platform : "Platform"}
              </motion.p>
            </div>
            <div className="relative z-10 pt-3">
              <motion.p
                className="block text-center text-5xl font-bold leading-[58px]"
                key={currentItem ? currentItem.name : "이름"}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
              >
                {currentItem ? currentItem.name : "이름"}
              </motion.p>
            </div>
          </AnimatePresence>
          <div className="pt-7">
            <div className="mx-auto flex h-[86px] w-[343px]">
              {time > 3 && (
                <span className="inline-block h-full w-full text-center text-[76px] font-bold leading-[91px]">
                  {time}
                </span>
              )}
              {time <= 3 && (
                <span className="inline-block h-full w-full bg-urgent bg-clip-text text-center text-[76px] font-bold leading-[91px] text-transparent">
                  {time === 0 ? "끝!" : time}
                </span>
              )}
            </div>
          </div>
          <div className="pt-9">
            <div className="flex items-center justify-center gap-[28px]">
              <button
                className="h-[100px] w-[100px] rounded-[50%] bg-[#121212] text-[24px] font-medium leading-[29px]"
                onClick={reset}
              >
                리셋
              </button>
              {(status === "STOPPED" || status === "PAUSED") && (
                <button
                  className="h-[126px] w-[126px] rounded-[50%] bg-white text-[28px] font-medium leading-[34px] text-[#121212]"
                  onClick={start}
                >
                  시작
                </button>
              )}
              {status === "RUNNING" && (
                <button
                  className="h-[126px] w-[126px] rounded-[50%] bg-[#CF4545] text-[28px] font-medium leading-[34px] text-white"
                  onClick={pause}
                >
                  정지
                </button>
              )}
              <button
                className="h-[100px] w-[100px] rounded-[50%] bg-[rgba(255,255,255,0.3)] text-[24px] font-medium leading-[29px]"
                onClick={() => {
                  const [, ...restItems] = csv;
                  setCsv([...restItems]);
                  reset();
                }}
              >
                다음
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 h-[717px] max-w-[940px] rounded-2xl bg-[#2B2C31] pb-[28px]">
        <div className="flex h-[155px] items-center justify-center gap-[16px] pt-[64px] pb-[36px]">
          <p className="text-[36px] font-bold leading-[43px]">다음 순서</p>
          <button
            className="flex h-[55px] w-[55px] items-center justify-center rounded-[50%] bg-[#594AFF]"
            onClick={() => {
              setCsv(shuffle([...csv]));
            }}
          >
            <ShuffleIcon />
          </button>
        </div>
        <div className="mx-4 h-[470px] overflow-y-scroll scrollbar scrollbar-track-[#2B2C31] scrollbar-thumb-[#D9D9D9] scrollbar-thumb-rounded-[21px]">
          <ul
            role="list"
            className="grid w-full grid-cols-4 gap-x-[28px] gap-y-[40px] px-[32px]"
          >
            {restItems.map(({ platform, name }) => (
              <motion.li
                layout
                layoutId={`${platform}-${name}`}
                key={`${platform}-${name}`}
                className="col-span-1 rounded-2xl bg-white"
              >
                <div
                  className={clsx(
                    "flex h-[48px] items-center justify-center rounded-t-2xl text-[20px] font-semibold leading-[24px]",
                    BG_COLOR_MAP[platform]
                  )}
                >
                  {platform}
                </div>
                <div className="flex h-[82px] items-center justify-center text-[28px] font-semibold leading-[34px] text-[#121212]">
                  {name}
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
