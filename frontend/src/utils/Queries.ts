export const GET_ALL_BOOKS = `
    query Query {
        getAllBooks {
            id,
            name,
            uploadedBy,
            author,
            bookLink,
            previewImageLink,
            bookPath,
            previewImagePath,
            tags,
            description,
            views,
            downloads
        }
    }
`;

export const GET_BOOK = `
    query Query ($id: ID!) {
        book (id: $id)  {
            id,
            name,
            uploadedBy,
            author,
            bookLink,
            previewImageLink,
            bookPath,
            previewImagePath,
            tags,
            description,
            views,
            downloads
        }
    }
`;

export const INCREASE_VIEWS = `
    query Query ($id: ID!) {
        increaseViews (id: $id)  {
            success
        }
    }
`;

export const INCREASE_DOWNLOADS = `
    query Query ($id: ID!) {
        increaseDownloads (id: $id)  {
            success
        }
    }
`;