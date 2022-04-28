export default function formatTIme(date) {
    // console.log(
    //     new Date(date).toLocaleTimeString([], {
    //         year: 'numeric',
    //         month: 'numeric',
    //         day: 'numeric',
    //         hour: '2-digit',
    //         minute: '2-digit',
    //     }),
    // );

    return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    })
}