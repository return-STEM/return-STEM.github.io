import {serialize} from "next-mdx-remote/serialize"
import {MDXRemoteSerializeResult} from "next-mdx-remote";
import path from "path";
import {promises as fs} from "fs"
import matter from "gray-matter"

const BIO_DIR = path.join(process.cwd(), "public/bios/")

export type Bio = {
    name: string
    picture: string
    department: string
    title: string
    bio: MDXRemoteSerializeResult
}

export async function getBios(): Promise<Bio[]> {

    let bios = []
    let files = await fs.readdir(BIO_DIR)
    for (const file of files) {
        if (!(file.endsWith(".md") || file.endsWith("mdx"))) continue;
        let mdFile = await fs.readFile(path.join(BIO_DIR, file))
        let md = matter(mdFile)
        let content = await serialize(md.content)
        let picture = `/bios/pictures/${path.parse(file).name}.png`

        bios.push({
            name: md.data.name,
            picture: picture,
            department: md.data.department,
            title: md.data.title,
            bio: content
        })
    }
    return bios

}

