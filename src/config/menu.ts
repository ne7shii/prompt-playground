type NavigationItem={
    name:string
    href:string
}
const navigation : NavigationItem[] = [
    { name: 'Home', href: '/'},
    { name: 'Pure Prompt', href: '/pure'},
    { name: 'VoiceOrder', href: '/voiceorder' },
    // { name: 'Projects', href: '#', current: false },
    // { name: 'Calendar', href: '#', current: false },
]

export default navigation