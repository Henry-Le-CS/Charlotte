'use client'

import { getNotifications } from '$/services/notification';
import { Button, Popover } from "flowbite-react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiBell } from 'react-icons/bi';
import { FaCheck } from "react-icons/fa";

export default function Notification({ data }) {
    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        setMetadata(data);
    }, [data]);

    useEffect(() => {
        const get = async () => {
            const data = await getNotifications();
            if (data) setMetadata(data)
        }
        get()
    }, [data])
    console.log('NOTIFICATION DATA:: ', metadata);

    return (
        metadata?.length > 0 ? (
            <Popover
                trigger="hover"
                content={
                    <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                        {metadata.map(item => (
                            <div key={item.id} className="mb-2">
                                <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                    <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">{item.type}</h3>
                                </div>
                                <div className="px-3 py-2 flex items-center justify-start">
                                    <img src={item.image} alt="avatar" className="w-10 h-10 rounded-full mr-3"/>
                                    <div>
                                        <h4>{item.username}</h4>
                                        <p className="max-w-80px text-ellipsis">{item.bio}</p>
                                    </div>
                                    <FaCheck className="ml-auto" />
                                </div>
                            </div>
                        ))}
                    </div>
                }
            >
                <Button>
                    <BiBell />
                </Button>
            </Popover>
        ) : null
    );
}

Notification.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired
    })).isRequired,
};
