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