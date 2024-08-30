// import Router from 'next/router';

const SnippetNotFound = () => {
    return (
        <div>
            <h1 className="text-xl bold">
                Sorry, but we couldn&apos;t find that particular Snippet
            </h1>
            {/* <p
                className="underline cursor-pointer"
                onClick={() => Router.back()}
            >
                {' '}
                Go Back{' '}
            </p> */}
        </div>
    );
};

export default SnippetNotFound;
