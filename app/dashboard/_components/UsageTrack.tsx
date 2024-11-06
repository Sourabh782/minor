import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
//import { currentUser } from '@clerk/nextjs/server'
import { UserButton, useSession, useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import Link from "next/link";

export const UsageTrack = ({ setHidden, hidden }: any) => {
  const { user } = useUser();
  const { total, setTotal } = useContext(TotalUsageContext);

  useEffect(() => {
    user && getUserData;
  }, [user]);
  const getUserData = async (userEmail: string) => {
    const userData = await db.query.AIOutput.findMany({
      where: eq(AIOutput.createdBy, userEmail),
      columns: {
        id: true,
        formData: true,
        aiResponse: true,
      },
      orderBy: (AIOutput, { desc }) => [desc(AIOutput.createdAt)],
    });
    let res = 0;
    for (let i = 0; i < userData.length; i++) {
      res = res + (userData[i]?.aiResponse?.split(" ").length ?? 0);
    }
    setTotal(res);
    return res;
  };
  const calcUsage = async () => {
    const usage = await getUserData(
      user?.primaryEmailAddress?.emailAddress ?? "none"
    );
    setTotal(usage);
    const usagelimiter = (await (total / 100000)) * 100;
    return usagelimiter;
  };

  const usagevalue = calcUsage();
  let perc = Math.round(total / 1000);
  if (perc >= 100) {
    perc = 100;
  }

  return (
    <div className="">
      <div className="bg-blue-600 text-white rounded-lg p-3 m-5">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-blue-400 w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: perc + "%" }}
          ></div>
        </div>
        <h2 className="mt-3 text-sm">{total}/100,000 words</h2>
      </div>
      <div className="p-3">
        <Link href={"/billing"} onClick={() => setHidden(!hidden)}>
          <Button name="upgrade" className="w-full bg-black text-white font-semibold text-lg hover:text-black hover:border-2 hover:border-black dark:text-black dark:hover:text-white hover:bg-white dark:bg-white dark:hover:bg-slate-700 transition-colors delay-100">
            Upgrade
          </Button>
        </Link>
      </div>
      <div className="items-center justify-center m-auto flex"></div>
    </div>
  );
};
