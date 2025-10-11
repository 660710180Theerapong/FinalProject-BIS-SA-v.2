import React from "react";

const NotificationItem = ({ id, title, message, onDelete }) => {
     return (
       <div className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-start">
         <div>
           <h2 className="text-xl font-semibold mb-2">{title}</h2>
           <p className="text-sm">{message}</p>
         </div>
         <button
           onClick={() => onDelete(id)}
           className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-all"
         >
           ลบ
         </button>
       </div>
     );
   };

export default NotificationItem;