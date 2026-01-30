import React from 'react';

const TechGridOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
            <div className="w-full h-full grid grid-cols-3 md:grid-cols-6">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className={`h-full border-r border-white/[0.08] ${i >= 3 ? 'hidden md:block' : ''} last:border-r-0`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TechGridOverlay;
