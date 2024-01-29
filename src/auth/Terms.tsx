import React from "react";
import { Link } from "react-router-dom";

export const Terms = () => {
    return (
        <div>
            <h1 className="mt-0 mb-2 text-5xl font-medium leading-tight text-primary"><s>Satirical</s> Terms and Conditions - Selling Your Soul, Digitally</h1>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                Welcome to the twisted carnival of our dystopian digital reality, where privacy is as rare as a unicorn in a concrete jungle. By proceeding, you're willingly shackling yourself to the whims of our corporate overlords, offering up your soul for a front-row seat to the dark comedy of mass surveillance, corporatocracy, and the delightful manipulation of social media for our financial gain.
            </p>

            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Surveillance Circus:</strong> Congratulations, you're now starring in our 24/7 reality show "Big Brother's Bizarre Adventure." Our surveillance algorithms are so advanced they can predict your lunch choices before you even think about them.
            </p>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Corporatocracy Rollercoaster:</strong> Strap in for the ride of your life as our corporate overlords pull the strings. Your preferences, desires, and even your dreams (we're working on that) will be meticulously exploited for their financial gain. Resistance is futile.
            </p>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Social Media Puppetry:</strong> Our platform isn't just a tool; it's a master manipulator. Your emotions, opinions, and fashion choices are mere playthings in our grand puppet show. We'll make you dance like a marionette for the sake of engagement metrics and our insatiable hunger for profit.
            </p>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Data Donations:</strong> Forget blood donations; we want your data! Your willingness to spill your digital guts to us is heartwarming. We'll use it to tailor ads so personalized, they'll know what you need before you do. Your privacy is our playground – and we've got the swings, slides, and soul-sucking data vacuum cleaners.
            </p>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Reality Distortion Fields:</strong> Prepare to question your sanity as we manipulate your perception of reality. Our newsfeed algorithms are designed to create echo chambers, making you believe everyone agrees with our narrative. Dissenters will be exiled to the realm of irrelevant posts.
            </p>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Microtransaction Mayhem:</strong> Your impulse purchases are our lifeblood. Our platform thrives on microtransactions – from virtual hats to imaginary pets, we'll drain your digital wallet faster than you can say "take my money."
            </p>
            <p className="mt-0 mb-4 text-base font-light leading-relaxed">
                <strong>Algorithmic Prophecies:</strong> We've consulted the digital oracles, and they predict your every move. Be amazed as our algorithms accurately foresee your next online purchase, relationship status change, and existential crisis. Who needs free will anyway?
            </p>
            <p>
                By proceeding, you acknowledge that you are a willing participant in this dark comedy. Your data, like a fine wine, will age in our digital cellar until it reaches maximum profitability. Remember, you're not just a user; you're a character in our dystopian play, and the script was written by Kafka, Orwell, and an AI with a sense of humor darker than midnight.
            </p>
            <Link to={"/login"}> <div
                className="flex items-center justify-center w-full rounded-lg h-28 bg-primary"
            >
                <p className="text-neutral-50">Go Back</p>
            </div></Link >


        </div >
    )
}