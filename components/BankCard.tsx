import { formatAmount } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Copy from "./Copy";

const BankCard = ({
  account,
  userName,
  showBalance = true,
}: CreditCardProps) => {
  return (
    <div className='flex flex-col'>
      <Link
        href={`/transaction-history/?id=${account.appwriteItemId}`}
        className='bank-card'
      >
        <div className='bank-card_content'>
          <div>
            <h1 className='text-white text-[16px] font-semibold'>
              {account.name}
            </h1>
            <p className='font-black text-white'>
              {formatAmount(account.currentBalance)}
            </p>
          </div>
          <article className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
              <h1 className='text-[12px] font-semibold text-white'>
                {userName}
              </h1>
              <h2 className='text-[12px] font-semibold text-white'>●● / ●●</h2>
            </div>
            <p className='text-[14px] font-semibold tracking-[1.1px] text-white'>
              <span className='text-[16px]'>{account?.mask}</span> ●●●● ●●●●
              ●●●●
            </p>
          </article>
        </div>
        <div className='bank-card_icon'>
          <Image src='/icons/Paypass.svg' width={20} height={24} alt='Pay' />
          <Image
            src='/icons/mastercard.svg'
            width={45}
            height={32}
            alt='MasterCard'
          />
        </div>
        <Image
          src='/icons/lines.png'
          width={320}
          height={100}
          alt='Lines'
          className='absolute'
        />
      </Link>

      {showBalance && <Copy title={account?.shareableId} />}
    </div>
  );
};

export default BankCard;
