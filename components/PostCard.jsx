import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Image from "next/image";

export default function PostCard({ post, setBadges, badges, index }) {
  const [images, setImages] = useState([
    "/img-badges/css.svg",
    "/img-badges/free.svg",
    "/img-badges/html.svg",
    "/img-badges/in.svg",
    "/img-badges/js.svg",
    "/img-badges/mongo.svg",
    "/img-badges/py.svg",
    "/img-badges/vue.svg",
  ]);
  const [viewList, setViewList] = useState(false);

  const router = useRouter();

  return (
    <div className="col-12 p-1" style={{ width: "100%" }}>
      {post.published ? (
        <div className="card p-2 h-100 bg-card mt-1">
          <h4>{post.title}</h4>
          <p style={{ fontSize: "13px" }}>{post.content}</p>
          <LinkPreview
            url={post.link}
            descriptionLength={100}
            primaryTextColor="gray"
            className="fw-lighter fs-6 overflow-hidden"
            fallback={
              <a
                className="card p-3 border border-1 h-100 text-dark Secondary"
                href={post.link}
                target="_blank"
                rel="noreferrer"
              >
                {post.link}
              </a>
            }
          />
          <br />
          <div className="row">
            <BadgesList
              viewList={viewList}
              images={images}
              post={post}
              setBadges={setBadges}
              badges={badges}
              index={index}
            />
            <Badges
              post={post}
              setViewList={setViewList}
              viewList={viewList}
              setBadges={setBadges}
              index={index}
            />
            <div className="created-at-css col">
              <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

const BadgesList = ({ viewList, images, post, setBadges, index }) => {
  return (
    <div className="css-badges mb-2">
      {viewList
        ? images.map((img, i) => (
            <Image
              onClick={() => {
                addBadgeImg(post.imgs, img, post._id, setBadges, index);
              }}
              key={i}
              src={img}
              height={27}
              width={27}
              alt={i}
            />
          ))
        : ""}{" "}
    </div>
  );
};

const Badges = ({ post, setViewList, viewList, setBadges, index }) => {
  return (
    <div className="css-badges col-12">
      {post.imgs != undefined && post.imgs != "" && post.imgs.split().length > 0
        ? post.imgs
            .split(",")
            .map((img, i) =>
              (img != "" && img != undefined && img) != null ? (
                <Image
                  onClick={() =>
                    removeBadgeImg(post.imgs, img, post._id, setBadges, index)
                  }
                  key={i}
                  src={img}
                  height={27}
                  width={27}
                  alt={i}
                />
              ) : (
                ""
              )
            )
        : ""}{" "}
      <Image
        priority
        src={"/img-badges/plus.png"}
        height={27}
        width={27}
        alt={"more"}
        onClick={() => {
          setViewList(!viewList);
        }}
      />
    </div>
  );
};
// Publish post
const addBadgeImg = async (imgs, img, id, setBadges, index) => {
  let arrayImg = "";
  if (imgs == undefined) {
    arrayImg = img;
  } else if (imgs != "") {
    if (!imgs.includes(img)) arrayImg = imgs + "," + img;
  }
  await setBadges({ badges: arrayImg, index: index });

  let post = {
    imgs: arrayImg,
    id: id,
  };

  try {
    // Update post
    await fetch("/api/posts", {
      method: "PATCH",
      body: JSON.stringify(post),
    }).then((response) => {});
  } catch (error) {}
};

const removeBadgeImg = async (imgs, img, id, setBadges, i) => {
  // change publishing state
  const arrayImgs = imgs.split(",");

  const index = arrayImgs.indexOf(img);
  arrayImgs.splice(index, img.length); // 2nd parameter means remove one item only

  setBadges({ badges: arrayImgs.join(), index: i });
  let post = {
    imgs: arrayImgs.join(),
    id: id,
  };

  try {
    // Update post
    await fetch("/api/posts", {
      method: "PATCH",
      body: JSON.stringify(post),
    }).then((response) => {});
  } catch (error) {}
};
