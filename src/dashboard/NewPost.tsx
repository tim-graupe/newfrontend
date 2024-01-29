import React from "react";
import { TETextarea } from "tw-elements-react";

export default function NewPost(): JSX.Element {
    return (
        <div className="flex justify-center">
            <div className="relative mb-3 xl:w-96">
                <TETextarea id="textareaExample" label="Message" rows={4}></TETextarea>
            </div>
        </div>
    );
}