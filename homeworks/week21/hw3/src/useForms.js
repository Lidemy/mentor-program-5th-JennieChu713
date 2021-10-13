import { useState, useEffect } from "react";
export default function useForms() {
  // values initialize
  const [filledInfo, setFilledInfo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notice, setNotice] = useState("");
  const [chooseType, setChooseType] = useState("");
  const [optionFilling, setOptionFilling] = useState(null);
  const [messageError, setMessageError] = useState({
    name: null,
    email: null,
    phone: null,
    notice: null,
    chooseType: null,
  });

  //handling functions
  const handleFormFocus = (e) => {
    const renew = messageError;
    for (const field in messageError) {
      if (field === e.target.name) {
        renew[field] = null;
      } else if (e.target.name === "choose-type" && field === "chooseType") {
        renew[field] = null;
      }
    }
    setMessageError(renew);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /[\w]+@[\w]+\.com/giu;
    const phonePattern = /^[0-9]{10}$/giu;
    const refresh = {};
    for (const field in messageError) {
      if (field === "name" && !name) {
        refresh[field] = "此欄位不可空白";
      }
      if (field === "email" && !email) {
        refresh[field] = "此欄位不可空白";
      } else if (field === "email" && !email.match(emailPattern)) {
        refresh[field] = "格式不符，請重新輸入";
      }
      if (field === "phone" && !phone) {
        refresh[field] = "此欄位不可空白";
      } else if (field === "phone" && !phone.match(phonePattern)) {
        refresh[field] = "格式不符，請重新輸入";
      }
      if (field === "chooseType" && !chooseType) {
        refresh[field] = "此選項不可空白";
      }
      if (field === "notice" && !notice) {
        refresh[field] = "此欄位不可空白";
      }
    }
    setMessageError(refresh);

    if (
      name &&
      email.match(emailPattern) &&
      phone.match(phonePattern) &&
      notice &&
      chooseType
    ) {
      setFilledInfo({
        name,
        email,
        phone,
        notice,
        chooseType,
        optionFilling,
      });
    }
  };
  useEffect(() => {
    const { name, email, phone, chooseType } = filledInfo;
    if (filledInfo) {
      alert(`
      非常感謝您的報名！以下為您填寫的資料：
      姓名：${name}
      電子信箱：${email}
      聯絡電話：${phone}
      報名類型：${chooseType}
      `);
    }
  }, [filledInfo]);

  // input-in-common function
  const handleInputChange = (e) => {
    if (e.target.name === "name" && e.target.value !== "") {
      setName(e.target.value);
    } else if (e.target.name === "email" && e.target.value !== "") {
      setEmail(e.target.value);
    } else if (e.target.name === "phone" && e.target.value !== "") {
      setPhone(e.target.value);
    } else if (e.target.name === "notice" && e.target.value !== "") {
      setNotice(e.target.value);
    } else if (e.target.name === "choose-type" && e.target.checked) {
      setChooseType(e.target.value);
    } else if (e.target.name === "optionFilling") {
      setOptionFilling(e.target.value);
    }
  };

  return {
    filledInfo,
    messageError,
    handleFormFocus,
    handleInputChange,
    handleSubmit,
  };
}
