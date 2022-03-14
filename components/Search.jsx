import styles from '../styles/components/search.module.scss'

import Card from './Card'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faSearch, faCheck } from "@fortawesome/free-solid-svg-icons"

import { useEffect, useCallback, useState } from 'react'
import $ from 'jQuery'
import Fuse from 'fuse.js'

export default function Search({courses}) {

    const [search, setSearch] = useState("");
    const [diff, setDiff] = useState(["all"]);
    const [lang, setLang] = useState(["all"]);
    const [diffMenu, setDiffMenu] = useState(false);
    const [langMenu, setLangMenu] = useState(false);

    useEffect(() => {
        $(function() {
            //load state
            if (!diffMenu)
                $("." + styles.search_cat_opt + "[data-cat='diff']").slideUp(300);
            else
                $("." + styles.search_cat_opt + "[data-cat='diff']").slideDown(300);
            if (!langMenu)
                $("." + styles.search_cat_opt + "[data-cat='lang']").slideUp(300);
            else
                $("." + styles.search_cat_opt + "[data-cat='lang']").slideDown(300);
            $("." + styles.search_cat_opt_elem_icon).hide();
            if (diff == "all")
                $("." + styles.search_cat_opt + "[data-cat='diff']").children("." + styles.search_cat_opt_all).children("." + styles.search_cat_opt_elem_icon).show();
            else
                diff.map(tag => {
                    $("." + styles.search_cat_opt + "[data-cat='diff']").children("." + styles.search_cat_opt_elem + `[data-tag='${tag}']`).children("." + styles.search_cat_opt_elem_icon).show();
                });
            if (lang == "all")
                $("." + styles.search_cat_opt + "[data-cat='lang']").children("." + styles.search_cat_opt_all).children("." + styles.search_cat_opt_elem_icon).show();
            else   
                lang.map(tag => {
                    $("." + styles.search_cat_opt + "[data-cat='lang']").children("." + styles.search_cat_opt_elem + `[data-tag='${tag}']`).children("." + styles.search_cat_opt_elem_icon).show()
                });
            //update
            $("." + styles.search_cat_text).off("click");
            $("." + styles.search_cat_text).on("click", function() {
                if ($(this).siblings().data("cat") == "diff")
                    setDiffMenu(!diffMenu);
                else
                    setLangMenu(!langMenu);
            });
            $("." + styles.search_cat_opt_elem).on("click", function() {
                if ($(this).parent().data("cat") == "diff")
                {
                    if (diff.includes($(this).data("tag"))) 
                        setDiff(diff.filter(str => str != $(this).data("tag")));
                    else
                        setDiff(diff.filter(function(str) { return str != "all"}).concat([$(this).data("tag")]));
                }
                else
                {
                    if (lang.includes($(this).data("tag"))) 
                        setLang(lang.filter(str => str != $(this).data("tag")));
                    else
                        setLang(lang.filter(str => str != "all").concat([$(this).data("tag")]));
                }
            });
            $("." + styles.search_cat_opt_all).on("click", function() {
                if ($(this).parent().data("cat") == "diff")
                {
                    if (diff == "all")
                        setDiff([]);
                    else
                        setDiff(["all"]);
                }
                else
                {
                    if (lang == "all")
                        setLang([]);
                    else
                        setLang(["all"]);
                }
            });
        });

        return () => {
            $("." + styles.search_cat_opt_elem).off("click");
            $("." + styles.search_cat_opt_all).off("click");
        }
    });

    const searchCourses = useCallback(() => {
      let newCourses = courses.filter(course => (diff.includes(course.difficulty) || diff == "all") && (lang.includes(course.language) || lang == "all"));
      const options = {
        includeScore: false,
        keys: ["name", "tags"],
        threshold: 0.5
      }
      if (search.length > 0)
      {
        const fuse = new Fuse(newCourses, options);
        newCourses = fuse.search(search).map(elem => {
          return elem.item;
        });
      }
      if (newCourses.length > 0)
        return newCourses.map(obj => {
          return (
            <Card key={obj.name} data={obj} />
          )
        });
      else
        return (
          <h1 className={styles.course_none}>Couldn&apos;t find anything!</h1>
        )
    }, [diff, lang, search, courses]);

    const searchChange = useCallback((event) => {
        setSearch(event.target.value);
    });

    return (
      <>
        <div className={styles.search}>
            <div className={styles.search_bar}>
              <FontAwesomeIcon className={styles.search_bar_icon} icon={faSearch}/>
              <input className={styles.search_bar_input} placeholder="Search our courses" type="search" onChange={searchChange} value={search}/>
            </div>
            <div className={styles.search_cat}>
              <h1 className={styles.search_cat_text}>Difficulty &nbsp;<FontAwesomeIcon icon={faChevronDown}/></h1>
              <div className={styles.search_cat_opt} data-cat="diff" style={{display: 'none'}}>
                <div className={styles.search_cat_opt_all} data-cat="diff">
                  <h2>All</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
                <div className={styles.search_cat_opt_elem} data-tag="Beginner">
                  <h2>Beginner</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
                <div className={styles.search_cat_opt_elem} data-tag="Moderate">
                  <h2>Moderate</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
                <div className={styles.search_cat_opt_elem} data-tag="Advanced">
                  <h2>Advanced</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
                <div className={styles.search_cat_opt_elem} data-tag="Expert">
                  <h2>Expert</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
              </div>
            </div>
            <div className={styles.search_cat}>
              <h1 className={styles.search_cat_text}>Language  &nbsp;<FontAwesomeIcon icon={faChevronDown}/></h1>
              <div className={styles.search_cat_opt} data-cat="lang" style={{display: 'none'}}>
                <div className={styles.search_cat_opt_all} data-cat="lang">
                  <h2>All</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
                <div className={styles.search_cat_opt_elem} data-tag="Python">
                  <h2>Python</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
                <div className={styles.search_cat_opt_elem} data-tag="C++">
                  <h2>C++</h2>
                  <FontAwesomeIcon className={styles.search_cat_opt_elem_icon} icon={faCheck}/>
                </div>
              </div>
            </div>
        </div>
        <div className={styles.course_cont}>
          {searchCourses()}
        </div>
      </>
    )
}