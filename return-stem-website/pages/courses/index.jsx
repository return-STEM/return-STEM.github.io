import Head from "next/head"
import Link from "next/link"

import { promises as fs } from 'fs'
import path from 'path'

export async function getStaticProps() {
  const dir = path.join(process.cwd(), 'data/courses.json');
  const courses = JSON.parse(await fs.readFile(dir, 'utf8'));
  return {
    props: { courses }
  }
}

export default function Courses({ courses }) {
    return (
        <div>
            <Head></Head>
            {courses.courses.map(obj => {
              return (
                <Link href={"courses/" + obj.href}>{obj.name}</Link>
              )
            })}
        </div>
    )
}