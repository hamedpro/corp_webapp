import React, { useEffect, useState } from "react";
import { downloadables_collection_document } from "./types";
import { custom_axios, download_a_file } from "../helpers";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useSearchParams } from "react-router-dom";
import { DownloadablesTable } from "./DownloadablesTable";
export const Downloads = () => {
	var [seaech_params, set_search_params] = useSearchParams();
	return (
		<DownloadablesTable
			filter_category_name={seaech_params.get("category_name") || undefined}
		/>
	);
};
