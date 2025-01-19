import React from 'react';

const Popup = ({ isOpen, onClose, white }) => {
    if (!isOpen) return null;

    const renderButton = (piece, src) => (
        <button className="w-12 h-12 bg-gray-500 hover:bg-gray-300" onClick={() => onClose(piece)}>
            <img src={`/pieces/${src}`} alt="Description of image" />
        </button>
    );

    return (
        <>
            <div className={'fixed h-screen w-screen top-0 left-0 bg-gray-700 opacity-50'}>

            </div>
            <div
                className={'fixed bg-blue-50 p-8 rounded-2xl border-2 border-blue-950 opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '}
                onClick={(e) => e.stopPropagation()}>
                {white ?
                    <>
                        {renderButton('b', 'Chess_bdt60.png')}
                        {renderButton('n', 'Chess_ndt60.png')}
                        {renderButton('r', 'Chess_rdt60.png')}
                        {renderButton('q', 'Chess_qdt60.png')}
                    </>
                    :
                    <>
                        {renderButton('B', 'Chess_blt60.png')}
                        {renderButton('N', 'Chess_nlt60.png')}
                        {renderButton('R', 'Chess_rlt60.png')}
                        {renderButton('Q', 'Chess_qlt60.png')}
                    </>
                }
            </div>
        </>
    )
        ;
};

export default Popup;