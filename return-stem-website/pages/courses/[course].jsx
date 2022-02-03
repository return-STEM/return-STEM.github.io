import { promises as fs } from 'fs'
import path from 'path'

export async function getStaticPaths() {
    const dir = path.join(process.cwd(), 'data/courses.json');
    const courses = JSON.parse(await fs.readFile(dir, 'utf8'));
    const paths = courses.courses.map(obj => {
        return {
            params: {
                course: obj.href,
            }
        }
    });
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({ params }) {
    const dir = path.join(process.cwd(), 'data/courses.json');
    const courses = JSON.parse(await fs.readFile(dir, 'utf8'));
    const courseData = courses.courses.find(elem => elem.href == params.course);
    return {
        props: { courseData }
    }
}


export default function course({ courseData }) {
    return (
        <h1>{courseData.name}</h1>
    )
}