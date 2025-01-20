const body = {
    type: ['veg', 'non-veg'],
    category: ['main', 'main'],
    name: ['poha', '34534'],
    price: ['33', '444'],
    desc: ['dsfsd', 'fsf']
}
const images = ["img1", "img2"]
const result = []
let x = {}
for (let i = 0; i < body.type.length; i++) {
    for (const key in body) {
        x[key] = body[key][i]
    }
    result.push({ ...x, image: images[i] })
}

console.log(result)

const arr = [
    { type: "veg", category: "main", name: "poha", price: 33, desc: "dsfsd" },
    { type: "non-veg", category: "main", name: "34534", price: 444, desc: "fsf" },
]