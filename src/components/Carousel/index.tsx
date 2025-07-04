import { createContext, FC, useState, Dispatch, SetStateAction, ReactNode, useMemo } from "react";
import CarouselItemList from "./CarouselItemList";
import CarouselItem from "./CarouselItem";
import CarouselNavigator from "./CarouselNavigator";
import CarouselIndicator from "./CarouselIndicator";
import styles from "./carousel.module.css";

interface CarouselProps {
    children?: ReactNode;
    className?: string;
}

interface CarouselCompoundProps {
    ItemList: typeof CarouselItemList;
    Item: typeof CarouselItem;
    Navigator: typeof CarouselNavigator;
    Indicator: typeof CarouselIndicator;
}

interface CarouselContextProps {
    carouselIndex: number;
    setCarouselIndex: Dispatch<SetStateAction<number>>;
    itemLength: number;
    setItemLength: Dispatch<SetStateAction<number>>;
}

export const CarouselContext = createContext<CarouselContextProps | null>(null);

const Carousel: FC<CarouselProps> & CarouselCompoundProps = ({ children, className }) => {
    const [carouselIndex, setCarouselIndex] = useState<number>(0);
    const [itemLength, setItemLength] = useState<number>(0);

    const contextValue = {
        carouselIndex,
        setCarouselIndex,
        itemLength,
        setItemLength,
    };

    const carouselCls = useMemo(() => {
        return `${styles.carouselContainer} ${className || ""}`.trim();
    }, [className]);

    return (
        <CarouselContext.Provider value={contextValue}>
            <div className={carouselCls}>
                {children}
            </div>
        </CarouselContext.Provider>
    );
};

Carousel.ItemList = CarouselItemList;
Carousel.Item = CarouselItem;
Carousel.Navigator = CarouselNavigator;
Carousel.Indicator = CarouselIndicator;

export default Carousel;