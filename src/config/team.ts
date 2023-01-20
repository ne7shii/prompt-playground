export type Member = {
    fullname: string
    role: string
    description: string
    imageUrl: string
    contact: Contact
}
export type Contact = {
    facebookUrl?: string,
    websiteUrl?: string,
    linkinUrl?: string,
}
export const members: Member[] = [
    {
        fullname: "Watcharapong Chaidee",
        role: " AI Engineer, Developer",
        imageUrl: "/watcharapong.jpg",
        description: 'founder of this project',
        contact: {
            facebookUrl: 'https://www.facebook.com/ne7shii',
            websiteUrl: 'https://ne7shii.me',
            linkinUrl: 'https://www.linkedin.com/in/watcharapong-chaidee-b567a2208/'
        }

    },
    {
        fullname: "Chonlatid Deerada",
        role: " AI Engineer, Developer",
        imageUrl: "/keng.jpeg",
        description: 'prompt developer',
        contact: {
            facebookUrl: 'https://www.facebook.com/inbrid',
            linkinUrl: 'https://www.linkedin.com/in/chonlatid-deerada-74503016b/'
        }

    }
]