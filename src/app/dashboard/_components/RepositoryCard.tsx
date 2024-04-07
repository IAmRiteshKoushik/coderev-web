"use client";
import React from "react";

import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

interface propsToRepositoryCard{
    key:        string,
    title:      string,
    blurb:      string,
    tags:       string[],
    time:       string,
    callback:   () => void,
    openRepo:   () => void,
}

const RepositoryCard = (props: propsToRepositoryCard): JSX.Element => {

    return(
        <div className="rounded-lg w-4/5 h-full mt-2 mb-2 border-solid 
            border-gray-400 border-2 p-5">
            {/* Headers */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-semibold text-2xl text-blue-700">{props.title + "/"}</h1> 
                    <span className="text-gray-500 text-sm">{"Last Updated: " + props.time}</span>
                </div>
                <div className="flex gap-x-2">
                    <Button
                        label="Open Repository"
                        severity="success"
                        onClick={props.openRepo}
                    />
                    <Button
                        icon="pi pi-trash"
                        severity="danger"
                        onClick={props.callback}
                    />
                </div>
            </div>
            {/* Details */}
            <div>
                <p className="text-wrap w-4/5 mb-1 text-gray-500 text-sm">{props.blurb}</p>
                <div className="flex items-center justify-start gap-x-2">
                    {props.tags.map((tag) => (
                        <Tag
                            key={""}
                            value={tag}
                            rounded
                            className="px-2 hover:cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </div>
    );

}

export default RepositoryCard;
