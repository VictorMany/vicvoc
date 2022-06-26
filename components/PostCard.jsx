import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Image from "next/image";

export default function PostCard({
  post,
  setBadges,
  badges,
  index,
  setHeight,
}) {
  const [images, setImages] = useState([
    "/img-badges/css.svg",
    "/img-badges/free.svg",
    "/img-badges/html.svg",
    "/img-badges/in.svg",
    "/img-badges/js.svg",
    "/img-badges/mongo.svg",
    "/img-badges/py.svg",
    "/img-badges/vue.svg",
    "/img-badges/react.svg",
    "/img-badges/angular.svg",
    "/img-badges/github.svg",
    "/img-badges/mysql.svg",
    "/img-badges/yt.svg",
    "/img-badges/google.svg",
  ]);
  const [viewList, setViewList] = useState(false);

  const router = useRouter();

  return (
    <div className="col-12 p-1" style={{ width: "100%" }}>
      {post.published ? (
        <div className="card p-2 h-100 bg-card mt-1">
          <h5>{post.title}</h5>
          <p style={{ fontSize: "13px" }}>{post.content}</p>
          <LinkPreview
            url={post.link}
            descriptionLength={100}
            primaryTextColor="gray"
            imageHeight={post.height == 0 ? 0 : null}
            className="fw-lighter fs-6 overflow-hidden"
            onSuccess={(e) => {
              if (e && e.image == null) {
                setHeight({
                  height: 0,
                  index: index,
                });
              }
            }}
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
              className="css-badges-list"
              onClick={() => {
                addBadgeImg(post.imgs, img, post._id, setBadges, index);
              }}
              key={i}
              src={img}
              height={30}
              width={30}
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
                  className="css-badges-list"
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
        height={30}
        width={30}
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
    else {
      arrayImg = imgs;
    }
  } else if (imgs == "") {
    arrayImg = img;
  }
  //I dont know why  I need to setBadges a couple of times
  await setBadges({ badges: arrayImg, index: index });
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
  let arrayImgs = imgs.split(",");
  const index = arrayImgs.indexOf(img);
  arrayImgs.splice(index, 1); // 2nd parameter means remove one item only
  arrayImgs = arrayImgs.join();
  await setBadges({ badges: arrayImgs, index: i });
  await setBadges({ badges: arrayImgs, index: i });
  let post = {
    imgs: arrayImgs,
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
