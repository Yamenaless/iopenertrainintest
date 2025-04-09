import Link from "next/link";
import Image from "next/image";

import { BaseDomain } from "@/lib/axios";
import { getDictionary } from "@/lib/dictionary";

import { getAllCategories } from "../../../services/allCategories";

import InnerHeader from "../../../components/layout/InnerHeader";
import CategoryCard from "../../../components/layout/CategoryCard";

import category from "../../../public/media/header-page/categories.jpg";
import CustomLink from "@/components/tools/custom-link";

export const metadata = {
  title: "Categories",
  description: "iOpener Training Center",
};

const categories = async ({ params: { lang } }) => {
  const { navigation } = await getDictionary(lang);
  const isEnglish = lang === "en";
  const parentCategories = await getAllCategories();
  return (
    <>
      <InnerHeader
        image={category}
        textPage={navigation.Categories}
        altText={navigation.Categories}
        classHeader="slide-up-inner"
        lang={lang}
        navigation={navigation}
      />
      <div className="categories my-5">
        <div className="container">
          <div className="row">
            {parentCategories.map((parentCategory) =>
              parentCategory.children.map((child) => (
                <div className="col-12 col-lg-3 mb-3" key={child.id}>
                  <CustomLink href={`/categories/${child.id}`} lang={lang}>
                    <CategoryCard
                      image={
                        child.media.length > 0
                          ? `${BaseDomain}/${child.media[0].file_path}`
                          : ""
                      }
                      title={isEnglish ? child.name.en : child.name.ar}
                    />
                  </CustomLink>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default categories;
