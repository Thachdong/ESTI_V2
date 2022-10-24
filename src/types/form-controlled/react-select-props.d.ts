type TReactSelectProps<TFieldValues, TFieldDatas> = {
    data: TFieldDatas[];
    select?: {
      [P in keyof TFieldSelect<TFieldDatas>]: TFieldSelect<TFieldDatas>[P];
    };
    defaultValue?: Partial<TFieldDatas>;
    required?: boolean;
    name: Path<TFieldValues>;
    label?: string;
    placeholder: string;
    rules?: RegisterOptions;
    control: any;
    menuPlacement?: "auto" | "bottom" | "top";
    selectClassName?: string;
    hideError?: boolean;
    selectContainerClassName?: string;
    isClearable?: boolean;
    menuPortalTarget?: HTMLElement;
    styles?: StylesConfig<unknown, boolean, GroupBase<unknown>>;
    disabled?: boolean;
    isMulti?: boolean;
    closeMenuOnSelect?: boolean;
    itemIsValue?: boolean;
    callback?: (val?: any) => Promise<any> | void;
    isLoading?: boolean;
    reset?: boolean;
  
}