import React from "react";

const ContentSection = ({ image, heading, text, reverse, id}) => (
    <section id={id}>
        <div className="container px-5">
            <div className={`row gx-5 align-items-center ${reverse ? 'flex-row-reverse' : ''}`}>
                <div className="col-lg-6">
                    <div className="p-5">
                        <img className="img-fluid rounded-circle" src={image} alt="..." />
                    </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="p-5">
                        <h2 className="display-4">{heading}</h2>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default ContentSection;