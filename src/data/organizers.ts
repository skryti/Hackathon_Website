export interface Organizer {
  name: string
  role: string
  avatar: string
  profileUrl: string
  googleColor: 'blue' | 'red' | 'yellow' | 'green'
  initials: string
}

export const ORGANIZERS: Organizer[] = [
  {
    name: 'Vaibhav Sharma',
    role: 'GDGoC Organizer / Lead',
    avatar:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/vaibhav_sharma_35TRQIm.jpg',
    profileUrl: 'https://gdg.community.dev/u/m9qwga/',
    googleColor: 'blue',
    initials: 'VS',
  },
  {
    name: 'Tanushka Tiwari',
    role: 'Graphic Design Lead',
    avatar:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/tanushka_tiwari.jpg',
    profileUrl: 'https://gdg.community.dev/u/tanushka8/',
    googleColor: 'red',
    initials: 'TT',
  },
  {
    name: 'Devyash Rasela',
    role: 'Technical Lead',
    avatar:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/devyash_rasela.jpg',
    profileUrl: 'https://gdg.community.dev/u/devyash4/',
    googleColor: 'yellow',
    initials: 'DR',
  },
  {
    name: 'Utsav Kumawat',
    role: 'Videography Lead',
    avatar:
      'https://res.cloudinary.com/startup-grind/image/upload/c_fill,w_250,h_250,g_center/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/v1/gcs/platform-data-goog/avatars/utsav_kumawat.jpg',
    profileUrl: 'https://gdg.community.dev/u/mcje7f/',
    googleColor: 'green',
    initials: 'UK',
  },
]
