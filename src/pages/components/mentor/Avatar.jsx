import React from 'react';

const Avatar = ({ name, src, size = "w-16 h-16" }) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div className={`${size} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg`}>
      {src ? (
        <img src={src} alt={name} className={`${size} rounded-full object-cover`} />
      ) : (
        initials
      )}
    </div>
  );
};

export default Avatar;