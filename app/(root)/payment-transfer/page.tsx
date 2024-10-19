import HeaderBox from "@/components/HeaderBox";
import PaymentTransferForm from "@/components/PaymentTransferForm";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Transfer = async () => {
  const loggedIn = await getLoggedInUser();

  if (!loggedIn) return;

  const accounts = await getAccounts({ userId: loggedIn.$id });

  const accountsData = accounts?.data;
  return (
    <section className='payment-transfer'>
      <HeaderBox
        title='انتقال وجه'
        subtext='لطفا اطلاعات و توضیح دقیقی در مورد انتقال وجه خود ارائه دهید.'
      />

      <section className='pt-5'>
        <PaymentTransferForm accounts={accountsData} />
      </section>
    </section>
  );
};

export default Transfer;
