import { useForm } from "react-hook-form";
import style from "./petForm.module.css";
import Button from "../Button";
import userAuthStore from "@/zustand/userAuth";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { imageUpload } from "@/utils/imageUpload";
import { Pet } from "@/types/user.type";
import { deletePet, updatePetInfo } from "@/apis/profile.api";
import { petSchema } from "@/consts/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const defaultValuesPetForm = {
  name: "",
  age: "",
  breed: "",
  _id: "",
  image: "",
};

interface petInfoProps {
  name?: string;
  age?: string;
  breed?: string;
  _id?: string;
  image?: string;
}

const PetForm: FC<petInfoProps> = (props) => {
  const { name, age, _id, image, breed } = props;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Pet>({
    defaultValues: defaultValuesPetForm,
    resolver: zodResolver(petSchema),
    mode: "onBlur",
  });
  const { userId, setUserPet, userPet } = userAuthStore();
  const [previewImg, setPreviewImg] = useState<string>(image || "");
  const [file, setFile] = useState<File | null>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue("name", name || "");
    setValue("age", age || "");
    setValue("breed", breed || "");
    setValue("_id", _id || "");
    setValue("image", image || "");
  }, [_id, name, age, breed, image]);

  const handleClickFile = () => {
    fileInputRef?.current?.click();
  };

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreviewImg(previewUrl);
    }
  };

  const onSubmit = async (petData: Pet) => {
    if (
      name === petData.name &&
      age === petData.age &&
      image === petData.image &&
      breed === petData.breed
    ) {
      setEdit(false);
      return;
    }

    let imageUrl = previewImg;
    if (file) {
      imageUrl = await imageUpload(file);
    }

    const updatedPet = await updatePetInfo(userId!, petData, _id!, imageUrl);

    if (updatedPet) {
      const updatePetList = userPet?.map((pet) =>
        pet._id === updatedPet._id ? updatedPet : pet
      );

      if (updatePetList) {
        userAuthStore.setState({
          userPet: updatePetList,
        });

        alert("반려동물 프로필이 업데이트되었습니다.");
        setEdit(false);
      }
    }
  };

  const deletePetInfo = async () => {
    try {
      const deletedPet = await deletePet(userId!, _id!);

      if (deletedPet) {
        alert("반려동물 프로필이 삭제되었습니다.");

        const updateList = userPet?.filter((pet) => pet._id !== _id);
        if (updateList) {
          setUserPet(updateList);
          return;
        }
      }
    } catch (error) {
      console.error("반려동물 정보 삭제 실패", error);
    }
  };

  const handleClose = () => {
    setEdit(false);
    reset({
      name: name || "",
      age: age || "",
      breed: breed || "",
      _id: _id || "",
      image: image || "",
    });
    setPreviewImg(image || "");
  };

  return (
    <div className={style.petForm_total_wrap}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        {edit ? (
          <div className={style.form_box}>
            <div className={style.button_wrap}>
              <Button type="submit" className={style.button}>
                저장
              </Button>
              <Button className={style.button} onClick={handleClose}>
                닫기
              </Button>
            </div>
            <ul className={style.edit_pet_ul}>
              <div className={style.edit_pet_ul_div}>
                <li className={style.list}>
                  <img
                    onClick={handleClickFile}
                    src={previewImg}
                    className={style.img}
                  />
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleChangeImg}
                    className={style.file}
                  />
                </li>
                <li className={style.list}>
                  <div className={style.list_div}>
                    <label>이름:</label>
                    <input
                      className={style.input}
                      placeholder="이름"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div>
                    {errors.name && (
                      <p className={style.errors}>{errors.name.message}</p>
                    )}
                  </div>
                </li>
                <li className={style.list}>
                  <div className={style.list_div}>
                    <label>나이:</label>
                    <input
                      className={style.input}
                      placeholder="나이"
                      {...register("age", { required: true })}
                    />
                  </div>
                  <div>
                    {errors.age && (
                      <p className={style.errors}>{errors.age.message}</p>
                    )}
                  </div>
                </li>
                <li>
                  <div className={style.list_div}>
                    <label>품종:</label>
                    <input
                      className={style.input}
                      placeholder="품종"
                      {...register("breed", { required: true })}
                    />
                  </div>
                  <div>
                    {errors.breed && (
                      <p className={style.errors}>{errors.breed.message}</p>
                    )}
                  </div>
                </li>
              </div>

              {/* <li>
              <label>성별</label>
              <input {...register("gender", { required: true })} />
              <div>
                <Button type="button" onClick={() => setValue("gender", "남")}>
                  남아
                </Button>
                <Button type="button" onClick={() => setValue("gender", "여")}>
                  여아
                </Button>
              </div>
            </li> */}
            </ul>
          </div>
        ) : (
          <div className={style.form_box}>
            <div className={style.button_wrap}>
              <Button
                className={style.button}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setEdit(true);
                }}
              >
                수정
              </Button>
              <Button
                className={style.button}
                type="button"
                onClick={deletePetInfo}
              >
                삭제
              </Button>
            </div>
            <ul className={style.pet_ul}>
              <li>
                <img src={image} className={style.img} />
              </li>
              <li>
                <p>
                  {name} / {age} / {breed}
                </p>
              </li>
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default PetForm;
