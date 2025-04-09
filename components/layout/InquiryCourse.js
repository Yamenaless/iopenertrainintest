"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReCAPTCHA from "react-google-recaptcha";

import customFetch from "@/lib/axios";

const schema = z.object({
    first_name: z
        .string()
        .min(3, { message: "Must be 3 or more characters long" }),
    last_name: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    mobile: z
        .string()
        .min(8, { message: "Must be 10 or more Number long" })
        .max(18, { message: "Must be 18 or less characters long" }),
    note_inq: z.string(),
    // accepted: z.string(),
});

const InquiryCourse = ({ lang, form_info, course }) => {
    const [captchaToken, setCaptchaToken] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });

    const onCaptchaChange = (token) => {
        setCaptchaToken(token);
    };

    const onSubmit = async (data) => {
        if (!captchaToken) {
            console.error("Please complete the reCAPTCHA");
            return;
        }
        try {
            const Message = `
            
            <body style="font-family: Arial, sans-serif; margin: 0; padding: 20px; border: 2px solid #ccc; border-radius: 10px;">
                <h2 style="color: #0d142d; font-size: 20px;padding:10px">Inquiry: ${course.name.en}</h2>
                <ul style="list-style-type: none; padding: 10px;">
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">First Name:</strong> ${data.first_name}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Last Name:</strong> ${data.last_name}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Email Address:</strong> ${data.email}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Mobile Number:</strong> ${data.mobile}</li>
                    <li style="margin-bottom: 10px;border-bottom:1px solid #ccc;padding: 10px"><strong style="margin-right: 5px; color: #0d142d;">Comments:</strong> ${data.note_inq}</li>
                </ul>
            </body>
            `;

            const payload = {
                message_type: "Inquiry",
                client_name: `Client name: ${data.first_name} ${data.last_name}`,
                client_email: `Client email: ${data.email}`,
                message: Message,
                subject: `Inquiry message from: ${data.first_name} ${data.last_name}`,
                recaptcha_token: captchaToken,
            };

            const response = await customFetch.post("/forms/message", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(response.data);
            setIsFormSubmitted(true);
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    return (
        <>
            <div className="inquiry">
                <div className="container">
                    {!isFormSubmitted ? (
                        <form
                            className="form-mud"
                            onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    {...register("first_name", {
                                        required: true,
                                    })}
                                    placeholder={form_info.first_name}
                                    className="form-control"
                                />
                                <label htmlFor="first_name">
                                    {form_info.first_name}
                                </label>
                                {errors.first_name && (
                                    <div className="text-danger">
                                        {errors.first_name.message}
                                    </div>
                                )}
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    {...register("last_name")}
                                    placeholder={form_info.last_name}
                                    className="form-control"
                                />
                                <label htmlFor="last_name">
                                    {form_info.last_name}
                                </label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    {...register("email")}
                                    placeholder={form_info.email}
                                    className="form-control"
                                />
                                <label htmlFor="email">{form_info.email}</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input
                                    type="text"
                                    id="mobile"
                                    name="mobile"
                                    {...register("mobile", { required: true })}
                                    placeholder={form_info.mobile}
                                    className="form-control"
                                />
                                <label htmlFor="mobile">
                                    {form_info.mobile}
                                </label>
                                {errors.mobile && (
                                    <div className="text-danger">
                                        {errors.mobile.message}
                                    </div>
                                )}
                            </div>
                            <div className="form-floating">
                                <textarea
                                    className="form-control"
                                    placeholder="Leave a comment here"
                                    {...register("note_inq")}
                                    id="note"></textarea>
                                <label htmlFor="note">
                                    <i className="far fa-comment px-1"></i>
                                    {form_info.comments}
                                </label>
                            </div>
                            {/* <div className="form-check">
                                <input
                                    className="form-check-input"
                                    name="accepted"
                                    type="checkbox"
                                    id="accepted"
                                    {...register("accepted", {
                                        required: true,
                                    })}
                                    value=""
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="accepted">
                                    {form_info.check_box}
                                </label>
                            </div> */}
                            {/* Your captcha code */}
                            {/* <div className="form-check my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    {...register("captcha")}
                                    id="flexCheckDefault"
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor="flexCheckDefault">
                                    {form_info.check_box}
                                </label>
                            </div> */}
                            <div className="mt-3">
                                <ReCAPTCHA
                                    sitekey={
                                        process.env
                                            .NEXT_PUBLIC_RECAPTCHA_SITE_KEY
                                    }
                                    onChange={onCaptchaChange}
                                />
                            </div>
                            <div className="mt-3 d-grid">
                                <button
                                    type="submit"
                                    className="btn-io-bg"
                                    disabled={isSubmitting}>
                                    {isSubmitting
                                        ? "Loading..."
                                        : `${form_info.send}`}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="success-message">
                            <div className="msg-success">
                                <div className="cover-msg">
                                    <div className="img-icon">
                                        <i className="far fa-check-circle"></i>
                                    </div>
                                    <div className="info-msg">
                                        <h2>Thank you </h2>
                                        <h4>Inquiry has been received</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default InquiryCourse;
