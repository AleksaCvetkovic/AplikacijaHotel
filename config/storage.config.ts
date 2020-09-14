export const StorageConfig = {
    photos: '../Storage/Photos/',

    photo: {
        destination: '../storage/Photos',
        maxSize: 3*1024,
        resize: {
            velike:{
                width: 120,
                haight: 100,
                derectory: 'velike/'
            },
            male: {
                width: 320,
                haight: 240,
                derectory: 'male/'
            },
        }
    }
};
