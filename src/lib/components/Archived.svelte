<!--

        <div class="input-wrap">
            <label for="companyId" class="field-label"
                >{t("labels.companyId")}</label
            >
            <input
                class="input-2 w-input"
                type="text"
                id="companyId"
                bind:value={registrationState.values.companyId}
            />
            <Errors errors={registrationState.errors} path="companyId" />
        </div>

<div class="input-wrap">
    <label class="field-label">{t("labels.applyAsCompany")}</label>
    <div class="input-group-wrap">
        <label
            class="registrationtype w-radio"
            class:is-checked={registrationState.values.applyAsCompany === true}
        >
            <input
                type="radio"
                bind:group={registrationState.values.applyAsCompany}
                value={true}
                style="opacity:0;position:absolute"
            />
            <span class="w-form-label">{t("answer.yes")}</span>
        </label>
        <label
            class="registrationtype w-radio"
            class:is-checked={registrationState.values.applyAsCompany === false}
        >
            <input
                type="radio"
                bind:group={registrationState.values.applyAsCompany}
                value={false}
                style="opacity:0;position:absolute"
            />
            <span class="w-form-label">{t("answer.no")}</span>
        </label>
    </div>
    <Errors errors={registrationState.errors} path="applyAsCompany" />
</div>-->
